import type { Scene } from '../types.ts'

export const SCENES: Scene[] = [
  {
    id: 'airport-checkin',
    title_zh: '机场值机',
    title_en: 'Airport check-in',
    level: 'A2-B1',
    goal: 'Check in for an international flight, confirm bags, and ask for a seat.',
    starter_line_en:
      'Good morning. May I see your passport and booking confirmation, please?',
    rubric_notes:
      'Use polite requests (Could I / I\'d like). Confirm destination and flight time. Ask about checked bags, cabin liquids, and window or aisle seats. Spell the name clearly if asked. Confirm the gate and boarding time before leaving the desk.',
    emoji: '✈️',
  },
  {
    id: 'immigration',
    title_zh: '入境与海关',
    title_en: 'Immigration / customs',
    level: 'A2-B1',
    goal: 'Answer an officer clearly about trip purpose, stay, and what you are bringing.',
    starter_line_en: 'Passport, please. What is the purpose of your visit?',
    rubric_notes:
      'Give short, honest answers: tourism / visiting friends / business. State how long you will stay and where. If asked about food, cash, or gifts, answer simply and ask for clarification if you do not understand. Do not argue. Use "Sorry, could you repeat that?" when needed.',
    emoji: '🛂',
  },
  {
    id: 'restaurant',
    title_zh: '餐厅点餐',
    title_en: 'Restaurant ordering',
    level: 'A2-B1',
    goal: 'Order food and drinks, mention allergies, and ask for the bill.',
    starter_line_en: 'Hi there! Table for one? Here is the menu. Are you ready to order?',
    rubric_notes:
      'Order with I\'d like / Could I have. Ask about ingredients and spice level. State allergies clearly (nuts, seafood, dairy). Ask for water, a recommendation, or a change. Close with the bill and how you will pay. Thank the server.',
    emoji: '🍽️',
  },
  {
    id: 'directions',
    title_zh: '问路',
    title_en: 'Asking for directions',
    level: 'A2-B1',
    goal: 'Ask where a place is, check the walking time, and confirm the route.',
    starter_line_en: 'You look a bit lost. Are you looking for something nearby?',
    rubric_notes:
      'Name the place clearly. Ask how far it is on foot or by subway. Confirm left/right, landmarks, and stop names. Repeat the key steps to check understanding. Ask someone to point it on a map if needed.',
    emoji: '🗺️',
  },
  {
    id: 'hotel',
    title_zh: '酒店入住 / 投诉',
    title_en: 'Hotel check-in / complaint',
    level: 'A2-B1',
    goal: 'Check in, ask about breakfast and Wi-Fi, then politely report a room problem.',
    starter_line_en:
      'Welcome. Do you have a reservation? May I have your name and passport, please?',
    rubric_notes:
      'Confirm nights, room type, and breakfast. Ask about Wi-Fi, checkout time, and luggage storage. For a complaint, stay calm: state the problem, say how it affects you, and ask for a fix (new room, extra towels, quieter room). Confirm what staff will do and when.',
    emoji: '🏨',
  },
  {
    id: 'shopping',
    title_zh: '购物与议价',
    title_en: 'Shopping / bargaining',
    level: 'A2-B1',
    goal: 'Ask about size, price, and payment; try a polite bargain in a market.',
    starter_line_en: 'Hi! Are you looking for something special? This jacket is on sale today.',
    rubric_notes:
      'Ask for size, color, material, and if you can try it on. Check the price and whether tax is included. In a market, bargain politely: That\'s a bit expensive / Could you do a better price? Offer a number. Ask about returns or cards vs cash. Do not be rude.',
    emoji: '🛍️',
  },
  {
    id: 'doctor',
    title_zh: '看医生',
    title_en: 'Seeing a doctor',
    level: 'A2-B1',
    goal: 'Describe symptoms, answer history questions, and check the medicine advice.',
    starter_line_en:
      'Hello, I\'m Dr. Patel. What seems to be the problem today?',
    rubric_notes:
      'Describe symptoms with simple time words (since yesterday, for three days). Mention pain location, fever, allergies, and current medicine. Answer yes/no questions clearly. Ask what the medicine is for, how often to take it, and when to come back. This is language practice, not real medical advice.',
    emoji: '🩺',
  },
  {
    id: 'taxi',
    title_zh: '出租车 / 网约车',
    title_en: 'Taxi / rideshare',
    level: 'A2-B1',
    goal: 'Give a destination, confirm the route and fare, and handle a small problem.',
    starter_line_en: 'Hi! Where would you like to go today?',
    rubric_notes:
      'Say the place and a landmark. Ask to use the meter or confirm an app fare. Mention a preferred route if you have one. Ask for AC, a receipt, or to stop here. If the driver goes the wrong way, politely correct them. Confirm you can pay by card.',
    emoji: '🚕',
  },
  {
    id: 'tickets',
    title_zh: '景点购票',
    title_en: 'Attraction tickets',
    level: 'A2-B1',
    goal: 'Buy tickets, ask about hours and discounts, and check what is included.',
    starter_line_en:
      'Next, please. Adult tickets are 28 euros. How many people are in your group?',
    rubric_notes:
      'Say how many tickets and the date/time slot. Ask about student/child discounts, audio guides, and last entry. Confirm what is included (museum + tower, skip-the-line). Ask where to enter and if photos are allowed. Check refund or change rules if plans change.',
    emoji: '🎟️',
  },
  {
    id: 'emergency',
    title_zh: '紧急求助',
    title_en: 'Emergency help',
    level: 'A2-B1',
    goal: 'Explain an urgent problem clearly and ask for the right help.',
    starter_line_en:
      'Emergency services, how can I help you? Are you safe right now?',
    rubric_notes:
      'State the emergency in one sentence (lost passport, theft, injury, someone is ill). Give location, your name, and whether anyone is hurt. Ask for police / ambulance / embassy. Speak slowly. Repeat key facts. Ask what to do next and where to wait. Keep language simple and calm.',
    emoji: '🆘',
  },
]

export function getScene(id: string): Scene | undefined {
  return SCENES.find((scene) => scene.id === id)
}
