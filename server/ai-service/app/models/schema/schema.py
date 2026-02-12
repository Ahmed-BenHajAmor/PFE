from tortoise import fields, models
from tortoise.contrib.pydantic import pydantic_model_creator
import enum
import uuid

# -------------------- Enums --------------------
class Role(str, enum.Enum):
    USER = "USER"
    ADMIN = "ADMIN"

class SoundStatus(str, enum.Enum):
    DRAFT = "DRAFT"
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"
    ARCHIVED = "ARCHIVED"

class SubscriptionStatus(str, enum.Enum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"
    CANCELLED = "CANCELLED"
    EXPIRED = "EXPIRED"

class SubscriptionPlan(str, enum.Enum):
    FREE = "FREE"
    PREMIUM_SILVER = "PREMIUM_SILVER"
    PREMIUM_GOLD = "PREMIUM_GOLD"

# -------------------- Models --------------------

class User(models.Model):
    id = fields.UUIDField(pk=True, default=uuid.uuid4)
    email = fields.CharField(max_length=255, unique=True)
    password = fields.CharField(max_length=255)
    name = fields.CharField(max_length=255)
    role = fields.CharEnumField(Role)
    created_at = fields.DatetimeField(auto_now_add=True)

    subscriptions: fields.ReverseRelation["Subscription"]
    inputted_sessions: fields.ReverseRelation["InputtedSession"]


class Subscription(models.Model):
    id = fields.UUIDField(pk=True, default=uuid.uuid4)
    plan = fields.CharEnumField(SubscriptionPlan)
    status = fields.CharEnumField(SubscriptionStatus)
    start_date = fields.DatetimeField()
    end_date = fields.DatetimeField()

    user: fields.ForeignKeyRelation[User] = fields.ForeignKeyField(
        "models.User", related_name="subscriptions"
    )

    payment: fields.ReverseRelation["Payment"]


class Payment(models.Model):
    id = fields.UUIDField(pk=True, default=uuid.uuid4)
    amount = fields.FloatField()
    currency = fields.CharField(max_length=10)
    payment_provider = fields.CharField(max_length=50)
    status = fields.CharField(max_length=50)
    created_at = fields.DatetimeField(auto_now_add=True)

    subscription: fields.ForeignKeyRelation[Subscription] = fields.OneToOneField(
        "models.Subscription", related_name="payment"
    )


class Sound(models.Model):
    id = fields.UUIDField(pk=True, default=uuid.uuid4)
    title = fields.CharField(max_length=255)
    description = fields.TextField(null=True)
    total_duration = fields.IntField()
    status = fields.CharEnumField(SoundStatus)
    url = fields.CharField(max_length=255, unique=True)
    number_of_downloads = fields.IntField(default=0)
    created_at = fields.DatetimeField(auto_now_add=True)

    session_sounds: fields.ReverseRelation["SessionSound"]
    actual_session_sounds: fields.ReverseRelation["ActualSessionSound"]


class InputtedSession(models.Model):
    id = fields.UUIDField(pk=True, default=uuid.uuid4)
    start_time = fields.DatetimeField()
    end_time = fields.DatetimeField()
    date = fields.DatetimeField()
    prompt = fields.TextField()
    chosen_duration = fields.IntField()
    tempature = fields.FloatField()
    temperature_unit = fields.CharField(max_length=10)

    user: fields.ForeignKeyRelation[User] = fields.ForeignKeyField(
        "models.User", related_name="inputted_sessions"
    )

    session_sounds: fields.ReverseRelation["SessionSound"]
    actual_session: fields.ReverseRelation["ActualSession"]
    session_feedback: fields.ReverseRelation["SessionFeedback"]


class SessionSound(models.Model):
    id = fields.UUIDField(pk=True, default=uuid.uuid4)
    volume = fields.FloatField()
    duration = fields.IntField()
    starting_time = fields.IntField()
    ending_time = fields.IntField()

    session: fields.ForeignKeyRelation[InputtedSession] = fields.ForeignKeyField(
        "models.InputtedSession", related_name="session_sounds"
    )
    sound: fields.ForeignKeyRelation[Sound] = fields.ForeignKeyField(
        "models.Sound", related_name="session_sounds"
    )


class ActualSession(models.Model):
    id = fields.UUIDField(pk=True, default=uuid.uuid4)
    start_time = fields.DatetimeField()
    actual_end_time = fields.DatetimeField()
    actual_duration = fields.IntField()

    inputted_session: fields.OneToOneRelation[InputtedSession] = fields.OneToOneField(
        "models.InputtedSession", related_name="actual_session"
    )

    played_sounds: fields.ReverseRelation["ActualSessionSound"]


class ActualSessionSound(models.Model):
    id = fields.UUIDField(pk=True, default=uuid.uuid4)
    played_duration = fields.IntField()
    played = fields.BooleanField()

    sound: fields.ForeignKeyRelation[Sound] = fields.ForeignKeyField(
        "models.Sound", related_name="actual_session_sounds"
    )
    actual_session: fields.ForeignKeyRelation[ActualSession] = fields.ForeignKeyField(
        "models.ActualSession", related_name="played_sounds"
    )


class SessionFeedback(models.Model):
    id = fields.UUIDField(pk=True, default=uuid.uuid4)
    feeling = fields.CharField(max_length=255)
    description = fields.TextField()
    created_at = fields.DatetimeField(auto_now_add=True)

    session: fields.OneToOneRelation[InputtedSession] = fields.OneToOneField(
        "models.InputtedSession", related_name="session_feedback"
    )
