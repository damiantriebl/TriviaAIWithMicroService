export enum npc {
  Elliot = 'elliot',
  Donna = 'donna',
  Margaret = 'margaret',
}
export const difficultyLevel = [
  'one',
  'two',
  'three',
  'four',
  'five'
]
export const defaultConfiguration = {
  topic: 'Javascript',
  language: 'English',
  difficulty: 'one',
}
export const settingsData = [
  {
    type: "topic",
    title: "Programming Language Topic",
    options: [
      'Javascript',
      'Python',
      'Java',
      'C#',
    ]
  }
  ,
  {
    type: "language",
    title: "Language",
    options: [
      'English',
      'Spanish',
      'French',
      'German',
    ]
  },
  {
    type: "difficulty",
    title: "Difficulty",
    options: [
      'one',
      'two',
      'three',
      'four',
      'five',
    ]
  },
]