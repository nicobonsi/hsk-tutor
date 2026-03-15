export interface UserStats {
  streakDays: number
  wordsMastered: number
  hskLevel: number
  totalSessions: number
  weeklyAccuracy: number
  weeklyXp: number
  allTimeXp: number
}

export interface AchievementCondition {
  key: string
  title: string
  description: string
  icon: string
  xpReward: number
  conditionType: string
  conditionValue: number
}

export const ACHIEVEMENTS: AchievementCondition[] = [
  // Streak achievements
  { key: 'streak_3', title: '3-Day Streak', description: 'Study 3 days in a row', icon: '🔥', xpReward: 30, conditionType: 'streak', conditionValue: 3 },
  { key: 'streak_7', title: 'Week Warrior', description: 'Study 7 days in a row', icon: '⚡', xpReward: 100, conditionType: 'streak', conditionValue: 7 },
  { key: 'streak_30', title: 'Monthly Master', description: 'Study 30 days in a row', icon: '🌟', xpReward: 500, conditionType: 'streak', conditionValue: 30 },
  { key: 'streak_100', title: 'Century Scholar', description: 'Study 100 days in a row', icon: '💎', xpReward: 1000, conditionType: 'streak', conditionValue: 100 },

  // Vocabulary achievements
  { key: 'words_10', title: 'First Steps', description: 'Master 10 words', icon: '📖', xpReward: 25, conditionType: 'words_mastered', conditionValue: 10 },
  { key: 'words_50', title: 'Vocab Builder', description: 'Master 50 words', icon: '📚', xpReward: 75, conditionType: 'words_mastered', conditionValue: 50 },
  { key: 'words_100', title: 'Word Collector', description: 'Master 100 words', icon: '🏆', xpReward: 150, conditionType: 'words_mastered', conditionValue: 100 },
  { key: 'words_500', title: 'Lexicon Legend', description: 'Master 500 words', icon: '👑', xpReward: 500, conditionType: 'words_mastered', conditionValue: 500 },

  // Level achievements
  { key: 'hsk1_complete', title: 'HSK 1 Champion', description: 'Master 80% of HSK Level 1', icon: '🥉', xpReward: 200, conditionType: 'level_complete', conditionValue: 1 },
  { key: 'hsk2_complete', title: 'HSK 2 Champion', description: 'Master 80% of HSK Level 2', icon: '🥈', xpReward: 300, conditionType: 'level_complete', conditionValue: 2 },
  { key: 'hsk3_complete', title: 'HSK 3 Champion', description: 'Master 80% of HSK Level 3', icon: '🥇', xpReward: 400, conditionType: 'level_complete', conditionValue: 3 },
  { key: 'hsk4_complete', title: 'HSK 4 Champion', description: 'Master 80% of HSK Level 4', icon: '🎖️', xpReward: 600, conditionType: 'level_complete', conditionValue: 4 },
  { key: 'hsk5_complete', title: 'HSK 5 Champion', description: 'Master 80% of HSK Level 5', icon: '🏅', xpReward: 800, conditionType: 'level_complete', conditionValue: 5 },
  { key: 'hsk6_complete', title: 'HSK 6 Grand Master', description: 'Master 80% of HSK Level 6', icon: '🌈', xpReward: 1200, conditionType: 'level_complete', conditionValue: 6 },

  // Session achievements
  { key: 'sessions_10', title: 'Dedicated Learner', description: 'Complete 10 study sessions', icon: '📝', xpReward: 50, conditionType: 'sessions', conditionValue: 10 },
  { key: 'sessions_50', title: 'Consistent Student', description: 'Complete 50 study sessions', icon: '✏️', xpReward: 200, conditionType: 'sessions', conditionValue: 50 },
]

export function checkNewAchievements(
  stats: UserStats,
  alreadyEarnedKeys: string[]
): AchievementCondition[] {
  const earned: AchievementCondition[] = []

  for (const achievement of ACHIEVEMENTS) {
    if (alreadyEarnedKeys.includes(achievement.key)) continue

    let conditionMet = false
    switch (achievement.conditionType) {
      case 'streak':
        conditionMet = stats.streakDays >= achievement.conditionValue
        break
      case 'words_mastered':
        conditionMet = stats.wordsMastered >= achievement.conditionValue
        break
      case 'level_complete':
        conditionMet = stats.hskLevel > achievement.conditionValue
        break
      case 'sessions':
        conditionMet = stats.totalSessions >= achievement.conditionValue
        break
    }

    if (conditionMet) earned.push(achievement)
  }

  return earned
}
