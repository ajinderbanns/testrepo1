/**
 * Achievement Definitions
 * 
 * Central registry of all achievements and milestones in the LLM Education App.
 * Achievements are unlocked based on user progress and can be expanded in the future.
 * 
 * @module constants/achievements
 */

import { MODULE_IDS } from './modules.js'

/**
 * Achievement Categories
 * 
 * Logical groupings for different types of achievements.
 */
export const ACHIEVEMENT_CATEGORIES = {
  PROGRESS: 'progress',
  MASTERY: 'mastery',
  ENGAGEMENT: 'engagement',
  MILESTONE: 'milestone',
  SPECIAL: 'special',
}

/**
 * Achievement IDs
 * 
 * Unique identifiers for each achievement.
 */
export const ACHIEVEMENT_IDS = {
  // Progress Achievements - Completing modules
  FIRST_STEPS: 'first_steps',
  CORE_LEARNER: 'core_learner',
  COMPREHENSIVE_MASTER: 'comprehensive_master',
  
  // Mastery Achievements - Completing all sections in a module
  INTRO_MASTER: 'intro_master',
  MECHANICS_MASTER: 'mechanics_master',
  ARCHITECTURE_MASTER: 'architecture_master',
  
  // Milestone Achievements - Overall progress
  HALFWAY_THERE: 'halfway_there',
  COURSE_COMPLETE: 'course_complete',
  
  // Engagement Achievements - Usage patterns
  QUICK_START: 'quick_start',
  DEDICATED_LEARNER: 'dedicated_learner',
  MARATHON_SESSION: 'marathon_session',
  CONSISTENT_LEARNER: 'consistent_learner',
  
  // Special Achievements - Hidden/bonus
  EARLY_BIRD: 'early_bird',
  NIGHT_OWL: 'night_owl',
  SPEED_LEARNER: 'speed_learner',
  THOROUGH_READER: 'thorough_reader',
}

/**
 * Achievement Metadata
 * 
 * Comprehensive information about each achievement including title, description,
 * criteria, icons, and unlock conditions.
 */
export const ACHIEVEMENTS_METADATA = {
  // Progress Achievements
  [ACHIEVEMENT_IDS.FIRST_STEPS]: {
    id: ACHIEVEMENT_IDS.FIRST_STEPS,
    title: 'First Steps',
    description: 'Complete your first module',
    category: ACHIEVEMENT_CATEGORIES.PROGRESS,
    icon: '🎯',
    points: 100,
    criteria: {
      type: 'module_complete',
      moduleId: MODULE_IDS.MODULE_1,
    },
    hidden: false,
  },
  [ACHIEVEMENT_IDS.CORE_LEARNER]: {
    id: ACHIEVEMENT_IDS.CORE_LEARNER,
    title: 'Core Learner',
    description: 'Master the core mechanics of LLMs',
    category: ACHIEVEMENT_CATEGORIES.PROGRESS,
    icon: '⚙️',
    points: 150,
    criteria: {
      type: 'module_complete',
      moduleId: MODULE_IDS.MODULE_2,
    },
    hidden: false,
  },
  [ACHIEVEMENT_IDS.COMPREHENSIVE_MASTER]: {
    id: ACHIEVEMENT_IDS.COMPREHENSIVE_MASTER,
    title: 'Comprehensive Master',
    description: 'Complete the comprehensive overview module',
    category: ACHIEVEMENT_CATEGORIES.PROGRESS,
    icon: '🎓',
    points: 200,
    criteria: {
      type: 'module_complete',
      moduleId: MODULE_IDS.MODULE_3,
    },
    hidden: false,
  },
  
  // Mastery Achievements
  [ACHIEVEMENT_IDS.INTRO_MASTER]: {
    id: ACHIEVEMENT_IDS.INTRO_MASTER,
    title: 'Introduction Master',
    description: 'Complete all sections in the Introduction module with perfect scores',
    category: ACHIEVEMENT_CATEGORIES.MASTERY,
    icon: '⭐',
    points: 50,
    criteria: {
      type: 'module_perfect',
      moduleId: MODULE_IDS.MODULE_1,
    },
    hidden: false,
  },
  [ACHIEVEMENT_IDS.MECHANICS_MASTER]: {
    id: ACHIEVEMENT_IDS.MECHANICS_MASTER,
    title: 'Mechanics Master',
    description: 'Complete all sections in the Core Mechanics module with perfect scores',
    category: ACHIEVEMENT_CATEGORIES.MASTERY,
    icon: '⭐',
    points: 75,
    criteria: {
      type: 'module_perfect',
      moduleId: MODULE_IDS.MODULE_2,
    },
    hidden: false,
  },
  [ACHIEVEMENT_IDS.ARCHITECTURE_MASTER]: {
    id: ACHIEVEMENT_IDS.ARCHITECTURE_MASTER,
    title: 'Architecture Master',
    description: 'Complete all sections in the Comprehensive Overview module with perfect scores',
    category: ACHIEVEMENT_CATEGORIES.MASTERY,
    icon: '⭐',
    points: 100,
    criteria: {
      type: 'module_perfect',
      moduleId: MODULE_IDS.MODULE_3,
    },
    hidden: false,
  },
  
  // Milestone Achievements
  [ACHIEVEMENT_IDS.HALFWAY_THERE]: {
    id: ACHIEVEMENT_IDS.HALFWAY_THERE,
    title: 'Halfway There',
    description: 'Reach 50% overall course completion',
    category: ACHIEVEMENT_CATEGORIES.MILESTONE,
    icon: '🏃',
    points: 75,
    criteria: {
      type: 'completion_percentage',
      percentage: 50,
    },
    hidden: false,
  },
  [ACHIEVEMENT_IDS.COURSE_COMPLETE]: {
    id: ACHIEVEMENT_IDS.COURSE_COMPLETE,
    title: 'Course Complete',
    description: 'Complete all three modules',
    category: ACHIEVEMENT_CATEGORIES.MILESTONE,
    icon: '🏆',
    points: 500,
    criteria: {
      type: 'all_modules_complete',
    },
    hidden: false,
  },
  
  // Engagement Achievements
  [ACHIEVEMENT_IDS.QUICK_START]: {
    id: ACHIEVEMENT_IDS.QUICK_START,
    title: 'Quick Start',
    description: 'Complete a section within 10 minutes of starting',
    category: ACHIEVEMENT_CATEGORIES.ENGAGEMENT,
    icon: '⚡',
    points: 25,
    criteria: {
      type: 'section_complete_time',
      maxMinutes: 10,
    },
    hidden: false,
  },
  [ACHIEVEMENT_IDS.DEDICATED_LEARNER]: {
    id: ACHIEVEMENT_IDS.DEDICATED_LEARNER,
    title: 'Dedicated Learner',
    description: 'Complete 5 sections in a single day',
    category: ACHIEVEMENT_CATEGORIES.ENGAGEMENT,
    icon: '📚',
    points: 100,
    criteria: {
      type: 'sections_per_day',
      count: 5,
    },
    hidden: false,
  },
  [ACHIEVEMENT_IDS.MARATHON_SESSION]: {
    id: ACHIEVEMENT_IDS.MARATHON_SESSION,
    title: 'Marathon Session',
    description: 'Study for over 2 hours in a single session',
    category: ACHIEVEMENT_CATEGORIES.ENGAGEMENT,
    icon: '🔥',
    points: 150,
    criteria: {
      type: 'session_duration',
      minMinutes: 120,
    },
    hidden: false,
  },
  [ACHIEVEMENT_IDS.CONSISTENT_LEARNER]: {
    id: ACHIEVEMENT_IDS.CONSISTENT_LEARNER,
    title: 'Consistent Learner',
    description: 'Study for 7 consecutive days',
    category: ACHIEVEMENT_CATEGORIES.ENGAGEMENT,
    icon: '📅',
    points: 200,
    criteria: {
      type: 'consecutive_days',
      days: 7,
    },
    hidden: false,
  },
  
  // Special Achievements
  [ACHIEVEMENT_IDS.EARLY_BIRD]: {
    id: ACHIEVEMENT_IDS.EARLY_BIRD,
    title: 'Early Bird',
    description: 'Complete a section before 7 AM',
    category: ACHIEVEMENT_CATEGORIES.SPECIAL,
    icon: '🌅',
    points: 50,
    criteria: {
      type: 'section_complete_hour',
      maxHour: 7,
    },
    hidden: true,
  },
  [ACHIEVEMENT_IDS.NIGHT_OWL]: {
    id: ACHIEVEMENT_IDS.NIGHT_OWL,
    title: 'Night Owl',
    description: 'Complete a section after 11 PM',
    category: ACHIEVEMENT_CATEGORIES.SPECIAL,
    icon: '🦉',
    points: 50,
    criteria: {
      type: 'section_complete_hour',
      minHour: 23,
    },
    hidden: true,
  },
  [ACHIEVEMENT_IDS.SPEED_LEARNER]: {
    id: ACHIEVEMENT_IDS.SPEED_LEARNER,
    title: 'Speed Learner',
    description: 'Complete a module in under 30 minutes',
    category: ACHIEVEMENT_CATEGORIES.SPECIAL,
    icon: '🚀',
    points: 100,
    criteria: {
      type: 'module_complete_time',
      maxMinutes: 30,
    },
    hidden: true,
  },
  [ACHIEVEMENT_IDS.THOROUGH_READER]: {
    id: ACHIEVEMENT_IDS.THOROUGH_READER,
    title: 'Thorough Reader',
    description: 'Spend at least the recommended time on every section',
    category: ACHIEVEMENT_CATEGORIES.SPECIAL,
    icon: '📖',
    points: 150,
    criteria: {
      type: 'recommended_time_all_sections',
    },
    hidden: true,
  },
}

/**
 * Get achievement metadata by ID
 * 
 * @param {string} achievementId - The achievement ID
 * @returns {Object|null} Achievement metadata or null if not found
 * 
 * @example
 * const achievement = getAchievementMetadata('first_steps')
 * // Returns: { id: 'first_steps', title: 'First Steps', ... }
 */
export const getAchievementMetadata = (achievementId) => {
  return ACHIEVEMENTS_METADATA[achievementId] || null
}

/**
 * Get all achievements by category
 * 
 * @param {string} category - The achievement category
 * @returns {Object[]} Array of achievement metadata objects
 * 
 * @example
 * const progressAchievements = getAchievementsByCategory('progress')
 * // Returns: [{ id: 'first_steps', ... }, { id: 'core_learner', ... }, ...]
 */
export const getAchievementsByCategory = (category) => {
  return Object.values(ACHIEVEMENTS_METADATA).filter(
    (achievement) => achievement.category === category
  )
}

/**
 * Get all visible (non-hidden) achievements
 * 
 * @returns {Object[]} Array of visible achievement metadata objects
 * 
 * @example
 * const visibleAchievements = getVisibleAchievements()
 * // Returns all achievements where hidden: false
 */
export const getVisibleAchievements = () => {
  return Object.values(ACHIEVEMENTS_METADATA).filter(
    (achievement) => !achievement.hidden
  )
}

/**
 * Get all hidden achievements
 * 
 * @returns {Object[]} Array of hidden achievement metadata objects
 * 
 * @example
 * const hiddenAchievements = getHiddenAchievements()
 * // Returns all achievements where hidden: true
 */
export const getHiddenAchievements = () => {
  return Object.values(ACHIEVEMENTS_METADATA).filter(
    (achievement) => achievement.hidden
  )
}

/**
 * Calculate total possible achievement points
 * 
 * @returns {number} Sum of all achievement point values
 * 
 * @example
 * const totalPoints = getTotalAchievementPoints()
 * // Returns: 2000 (sum of all achievement points)
 */
export const getTotalAchievementPoints = () => {
  return Object.values(ACHIEVEMENTS_METADATA).reduce(
    (total, achievement) => total + achievement.points,
    0
  )
}

/**
 * Get achievements related to a specific module
 * 
 * @param {number} moduleId - The module ID
 * @returns {Object[]} Array of achievement metadata objects related to the module
 * 
 * @example
 * const module1Achievements = getModuleAchievements(1)
 * // Returns achievements that are unlocked by completing Module 1
 */
export const getModuleAchievements = (moduleId) => {
  return Object.values(ACHIEVEMENTS_METADATA).filter(
    (achievement) =>
      (achievement.criteria.type === 'module_complete' ||
        achievement.criteria.type === 'module_perfect') &&
      achievement.criteria.moduleId === moduleId
  )
}
