ALTER TABLE "InputtedSession"
ALTER COLUMN "activity"
TYPE "SoundActivity"[]
USING ARRAY["activity"]::"SoundActivity"[],

ALTER COLUMN "environment"
TYPE "SoundEnvironment"[]
USING ARRAY["environment"]::"SoundEnvironment"[],

ALTER COLUMN "season"
TYPE "Season"[]
USING ARRAY["season"]::"Season"[];
