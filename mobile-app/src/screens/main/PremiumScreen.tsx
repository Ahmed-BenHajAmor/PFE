import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors, FontSize, FontFamily, Spacing, BorderRadius } from '../../theme';
import type { MainStackParamList } from '../../navigation/AppNavigator';
import { LinearGradient } from 'expo-linear-gradient';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
type Props = NativeStackScreenProps<MainStackParamList, 'Premium'>;

interface Feature {
  title: string;
  subtitle: string;
}

const FEATURES: Feature[] = [
  { title: 'Unlimited AI Generations', subtitle: 'Never run out of inspiration.' },
  { title: 'Lossless Spatial Audio', subtitle: '3D immersive sound experience.' },
  { title: 'Offline Listening', subtitle: 'Save soundscapes to your device.' },
  { title: 'Zero Interruptions', subtitle: 'No ads, no distractions.' },
];

const FeatureRow: React.FC<{ feature: Feature }> = ({ feature }) => (
  <View style={styles.featureRow}>
    <View style={styles.checkCircle}>
      <Text style={styles.checkMark}>✓</Text>
    </View>
    <View style={styles.featureText}>
      <Text style={styles.featureTitle}>{feature.title}</Text>
      <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
    </View>
  </View>
);

const PremiumScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SimpleLineIcons name="arrow-left-circle" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ZenAI Premium</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Elevate Your Mind</Text>
          <Text style={styles.heroSubtitle}>
            Immerse yourself in AI-crafted soundscapes tailored for your deep focus.
          </Text>
        </View>

        {/* Basic Plan */}
        <View style={styles.basicCard}>
          <Text style={styles.planName}>Basic</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceAmount}>$0</Text>
            <Text style={styles.pricePeriod}> / month</Text>
          </View>
          <View style={styles.basicFeature}>
            <Text style={styles.checkMark}>✓</Text>
            <Text style={styles.basicFeatureText}>3 AI Generations daily</Text>
          </View>
          <View style={styles.basicFeature}>
            <Text style={styles.checkMark}>✓</Text>
            <Text style={styles.basicFeatureText}>Standard Audio Quality</Text>
          </View>
        </View>

        {/* Silver Plan */}
        <View style={styles.premiumCard}>
          <View style={styles.cardHeader}>
            <View style={styles.recommendedBadge}>
              <Text style={styles.recommendedText}>RECOMMENDED</Text>
            </View>
            <View style={styles.sparkle}>
              <Text style={styles.sparkleIcon}>✦</Text>
            </View>
          </View>
          <Text style={styles.premiumPlanName}>Premium : SILVER</Text>
          <View style={styles.priceRow}>
            <Text style={styles.premiumAmount}>$9.99</Text>
            <Text style={styles.premiumPeriod}> / month</Text>
          </View>
          {FEATURES.map((f, i) => (
            <FeatureRow key={i} feature={f} />
          ))}
        </View>

        {/* Gold Plan */}
        <View style={[styles.premiumCard, styles.goldCard]}>
          <View style={styles.cardHeader}>
            <View style={styles.recommendedBadge}>
              <Text style={styles.recommendedText}>RECOMMENDED</Text>
            </View>
            <View style={styles.sparkle}>
              <Text style={styles.sparkleIcon}>✦</Text>
            </View>
          </View>
          <Text style={styles.premiumPlanName}>
            Premium : <Text style={styles.goldText}>GOLD</Text>
          </Text>
          <View style={styles.priceRow}>
            <Text style={styles.premiumAmount}>$19.99</Text>
            <Text style={styles.premiumPeriod}> / month</Text>
          </View>
          {FEATURES.map((f, i) => (
            <FeatureRow key={i} feature={f} />
          ))}
        </View>

        {/* CTA */}
        <TouchableOpacity  activeOpacity={0.85}>
          <LinearGradient
            colors={['#7F13EC', '#2DD4BF']}
            style={styles.upgradeBtn}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}  
          >
            <Text style={styles.upgradeText}>Upgrade Now</Text>
          </LinearGradient>
          
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.premiumCardBgAlt,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing['4xl'],
    paddingBottom: Spacing.base,
  },
  backBtn: {
    fontSize: FontSize.xl,
    color: Colors.textPrimary,
    width: 32,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: FontSize.md,
    fontFamily: FontFamily.semiBold,
    color: Colors.textPrimary,
  },
  headerSpacer: { width: 32 },
  container: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing['4xl'],
    gap: Spacing.base,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    gap: Spacing.sm,
  },
  heroTitle: {
    fontSize: FontSize['3xl'],
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  heroSubtitle: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  basicCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    gap: Spacing.sm,
  },
  planName: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: Spacing.xs,
  },
  priceAmount: {
    fontSize: FontSize['3xl'],
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  pricePeriod: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
  },
  basicFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  basicFeatureText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  premiumCard: {
    backgroundColor: Colors.premiumCardBg,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  goldCard: {
    borderColor: '#C9A227',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recommendedBadge: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  recommendedText: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.bold,
    color: Colors.white,
    letterSpacing: 0.5,
  },
  sparkle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryGlow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkleIcon: {
    color: Colors.primary,
    fontSize: FontSize.lg,
  },
  premiumPlanName: {
    fontSize: FontSize.xl,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  goldText: {
    color: '#C9A227',
  },
  premiumAmount: {
    fontSize: FontSize['3xl'],
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  premiumPeriod: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkMark: {
    color: Colors.white,
    fontSize: FontSize.sm,
    fontFamily: FontFamily.bold,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.semiBold,
    color: Colors.textPrimary,
  },
  featureSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  upgradeBtn: {
    borderRadius: BorderRadius.full,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    marginTop: Spacing.md,
    backgroundColor: Colors.accentTeal,
  },
  upgradeText: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
});

export default PremiumScreen;
