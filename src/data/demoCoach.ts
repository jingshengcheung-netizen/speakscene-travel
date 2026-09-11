import type { CoachReply, Scene } from '../types.ts'

const SCENE_TIPS: Record<string, string[]> = {
  'airport-checkin': [
    '礼貌提要求时，用 I\'d like / Could I 比 I want 更自然。例：I\'d like a window seat, please.',
    '行李件数用 How many bags can I check? 问；超重用 overweight。例：Is this bag overweight?',
    '确认信息时先重复关键点。例：So boarding starts at 10:40 at gate B12, right?',
    '听不清就直接说：Sorry, could you say that again?',
  ],
  immigration: [
    '目的用短句说清楚。例：I\'m here for tourism. I\'ll stay for one week.',
    '不会的词不要编造，先请对方重复。例：Sorry, could you repeat that more slowly?',
    '被问带了什么时，先答 yes/no，再补细节。例：I only have clothes and a small gift.',
    '停留时间用 for + 时段。例：I\'ll stay for five days.',
  ],
  restaurant: [
    '点餐用 I\'d like / Could I have，不要用 Give me。例：I\'d like the grilled fish, please.',
    '过敏必须说清楚 I\'m allergic to…。例：I\'m allergic to peanuts.',
    '问推荐用 What do you recommend? 比 What is good? 更地道。',
    '结账说 Could I have the bill, please? 比 I want to pay 更礼貌。',
  ],
  directions: [
    '先报地点再问路。例：Excuse me, how do I get to the subway station?',
    '确认方向时重复对方的话。例：So I turn left at the traffic lights, then walk two blocks?',
    '问步行时间：How long does it take on foot?',
    '听不懂路线时可以说：Could you point it out on the map?',
  ],
  hotel: [
    '入住先报姓名和预订。例：I have a reservation under Chen Wei.',
    '投诉先说问题，再提请求。例：The air conditioning isn\'t working. Could I change rooms?',
    '确认员工下一步：What time will someone come to check it?',
    '礼貌投诉用 I\'m afraid… 开头更软。例：I\'m afraid the room is too noisy.',
  ],
  shopping: [
    '问价格：How much is this? 比 What\'s the money? 正确。',
    '试穿：Could I try this on in a medium?',
    '议价保持礼貌：That\'s a bit expensive. Could you do 40?',
    '付款前确认：Do you take cards, or is it cash only?',
  ],
  doctor: [
    '症状 + 时间：I\'ve had a sore throat since yesterday.',
    '位置用 It hurts here / in my…。例：It hurts in my left ear.',
    '过敏和正在吃的药要主动说。例：I\'m allergic to penicillin.',
    '问用法：How many times a day should I take this?',
  ],
  taxi: [
    '先说目的地和地标。例：Please take me to the British Museum, near the Holborn station.',
    '确认计价：Could you use the meter, please?',
    '走错时冷静纠正：I think we should turn left here.',
    '下车要收据：Could I have a receipt, please?',
  ],
  tickets: [
    '先说人数和日期。例：Two adult tickets for this afternoon, please.',
    '问优惠：Is there a student discount?',
    '确认包含内容：Does this include the tower as well?',
    '问最后入场：What\'s the last entry time?',
  ],
  emergency: [
    '先用一句说清紧急情况。例：My passport was stolen on the subway.',
    '补充地点和是否有人受伤。例：I\'m at Central Station. No one is hurt.',
    '听不清就请对方慢一点：Please speak more slowly.',
    '结束前确认下一步：Where should I wait for the officer?',
  ],
}

const SCENE_PHRASES: Record<string, Array<[string, string, string]>> = {
  'airport-checkin': [
    [
      'I\'d like to check in for the flight to London. — 我要办理飞往伦敦的值机。',
      'Could I have a window seat, please? — 可以给我靠窗座位吗？',
      'How many bags can I check in? — 我可以托运几件行李？',
    ],
    [
      'Is there a baggage allowance for this fare? — 这个票价包含多少行李额？',
      'Could you tag this bag through to my final destination? — 能把这件行李直挂到终点吗？',
      'Where is the security checkpoint? — 安检在哪里？',
    ],
    [
      'Could I get an aisle seat instead? — 可以换成靠过道的座位吗？',
      'What time does boarding start? — 什么时候开始登机？',
      'Do I need to show my visa documents here? — 这里需要出示签证材料吗？',
    ],
    [
      'Could you print my boarding pass, please? — 请帮我打印登机牌。',
      'Is the flight on time? — 航班准点吗？',
      'Thank you, I\'ll head to the gate now. — 谢谢，我现在去登机口。',
    ],
  ],
  immigration: [
    [
      'I\'m here for tourism. — 我来旅游。',
      'I\'ll stay for one week. — 我会待一周。',
      'I\'m staying at a hotel near the station. — 我住在车站附近的酒店。',
    ],
    [
      'I\'m visiting a friend. Here is their address. — 我来访友，这是他们的地址。',
      'I have a return ticket on Friday. — 我周五有回程票。',
      'Sorry, could you repeat that? — 抱歉，能再说一遍吗？',
    ],
    [
      'I\'m not carrying any food or plants. — 我没有带食品或植物。',
      'These are just personal gifts. — 这些只是私人礼物。',
      'I have less than the duty-free limit. — 我没超过免税额。',
    ],
    [
      'Yes, this is my first visit. — 是的，这是我第一次来。',
      'I will leave on the 18th. — 我 18 号离开。',
      'Thank you, officer. — 谢谢警官。',
    ],
  ],
  restaurant: [
    [
      'I\'d like a table for one, please. — 请给我一张单人桌。',
      'Could I have a minute with the menu? — 我可以先看一下菜单吗？',
      'What do you recommend today? — 今天有什么推荐？',
    ],
    [
      'I\'d like the tomato soup and a salad. — 我要番茄汤和一份沙拉。',
      'I\'m allergic to shellfish. — 我对贝类过敏。',
      'Could I have that without onions? — 可以不要洋葱吗？',
    ],
    [
      'Could we have some water, please? — 请给我们一些水。',
      'This is a bit too spicy for me. — 对我来说有点太辣了。',
      'Could I change this to the pasta? — 能把这个换成意面吗？',
    ],
    [
      'Could I have the bill, please? — 请结账。',
      'We\'ll pay by card. — 我们用卡付。',
      'It was delicious, thank you. — 很好吃，谢谢。',
    ],
  ],
  directions: [
    [
      'Excuse me, how do I get to the old town? — 打扰一下，去老城怎么走？',
      'Is it within walking distance? — 走路能到吗？',
      'Which subway line should I take? — 我该坐哪条地铁？',
    ],
    [
      'How long does it take on foot? — 走路要多久？',
      'Should I turn left or right at the lights? — 到红绿灯是左转还是右转？',
      'Is there a landmark I should look for? — 有什么标志性建筑可以认路吗？',
    ],
    [
      'So I walk straight for two blocks, right? — 所以我直行两个街区，对吗？',
      'Could you point it out on the map? — 能在地图上指给我看吗？',
      'Is there a closer station? — 有更近的车站吗？',
    ],
    [
      'Thanks, I think I can find it now. — 谢谢，我想我能找到了。',
      'Is this the right way to the river? — 去河边是这条路吗？',
      'Have a nice day! — 祝你今天愉快！',
    ],
  ],
  hotel: [
    [
      'I have a reservation under Li Na. — 我有预订，名字是 Li Na。',
      'It\'s for two nights, a double room. — 两晚，大床房。',
      'Does the rate include breakfast? — 房价含早餐吗？',
    ],
    [
      'What time is checkout? — 什么时候退房？',
      'Could I have the Wi-Fi password? — 能给我 Wi-Fi 密码吗？',
      'Is there a luggage room after checkout? — 退房后有行李寄存吗？',
    ],
    [
      'I\'m afraid the heating isn\'t working. — 恐怕暖气坏了。',
      'Could I change to a quieter room? — 能换一间更安静的房间吗？',
      'There aren\'t enough towels in the bathroom. — 卫生间毛巾不够。',
    ],
    [
      'When will someone come to fix it? — 什么时候会有人来修？',
      'Could I get a late checkout, please? — 可以延迟退房吗？',
      'Thanks for taking care of this. — 谢谢你帮忙处理。',
    ],
  ],
  shopping: [
    [
      'Do you have this in a medium? — 这个有中号吗？',
      'Can I try it on? — 我可以试穿吗？',
      'What material is this? — 这是什么面料？',
    ],
    [
      'How much is it? — 这个多少钱？',
      'Is tax included? — 含税吗？',
      'That\'s a bit more than I wanted to spend. — 比我预算高了一点。',
    ],
    [
      'Could you do a better price? — 能便宜一点吗？',
      'I\'ll take it if you can do 35. — 如果 35 我就买。',
      'Do you have a smaller bag for this? — 有小一点的袋子吗？',
    ],
    [
      'I\'ll pay by card. — 我刷卡。',
      'Can I return it if it doesn\'t fit? — 如果不合适可以退吗？',
      'Could I have a receipt, please? — 请给我收据。',
    ],
  ],
  doctor: [
    [
      'I\'ve had a fever since last night. — 我从昨晚开始发烧。',
      'It hurts when I swallow. — 吞咽的时候会疼。',
      'I also feel very tired. — 我还觉得很累。',
    ],
    [
      'The pain is here, on the left side. — 疼在这边，左边。',
      'I don\'t have any allergies. — 我没有过敏。',
      'I\'m taking vitamin C, nothing else. — 我只在吃维 C，没别的药。',
    ],
    [
      'Should I take this before or after meals? — 这个饭前吃还是饭后吃？',
      'How many days should I take it? — 要吃几天？',
      'Are there any side effects? — 有副作用吗？',
    ],
    [
      'When should I come back if it doesn\'t get better? — 如果没好转，我什么时候回来？',
      'Do I need a sick note? — 我需要病假条吗？',
      'Thank you, doctor. — 谢谢医生。',
    ],
  ],
  taxi: [
    [
      'Please take me to Central Station. — 请送我去中央车站。',
      'It\'s next to the big clock tower. — 就在大钟楼旁边。',
      'Could you use the meter, please? — 请打表好吗？',
    ],
    [
      'I\'m not in a hurry. The safer route is fine. — 我不赶时间，走更安全的路就行。',
      'Could you turn on the air conditioning? — 能开一下空调吗？',
      'How long will it take in this traffic? — 这会儿堵车要多久？',
    ],
    [
      'I think this is the wrong way. — 我觉得路走错了。',
      'Could you stop here, please? — 请在这里停。',
      'I\'ll get out at the next lights. — 下一个红绿灯我下车。',
    ],
    [
      'How much is that? — 多少钱？',
      'Can I pay by card? — 可以刷卡吗？',
      'Could I have a receipt? — 能给我收据吗？',
    ],
  ],
  tickets: [
    [
      'Two adult tickets, please. — 请给我两张成人票。',
      'Do you have tickets for 3 p.m.? — 有下午 3 点的票吗？',
      'Is there a student price? — 有学生票吗？',
    ],
    [
      'Does this include the guided tour? — 这含讲解吗？',
      'Where is the entrance? — 入口在哪里？',
      'Are photos allowed inside? — 里面可以拍照吗？',
    ],
    [
      'What time is last entry? — 最晚入场是几点？',
      'Can I change the time slot later? — 之后能改时段吗？',
      'Is the audio guide extra? — 语音导览另收费吗？',
    ],
    [
      'We\'ll take two tickets for today. — 我们买两张今天的票。',
      'Can I pay by card? — 可以刷卡吗？',
      'Thank you. Have a good day. — 谢谢，祝你今天愉快。',
    ],
  ],
  emergency: [
    [
      'I need help. My bag was stolen. — 我需要帮助，我的包被偷了。',
      'I\'m at the north exit of the station. — 我在车站北口。',
      'No one is hurt, but I lost my passport. — 没有人受伤，但我的护照丢了。',
    ],
    [
      'It happened about ten minutes ago. — 大概十分钟前发生的。',
      'The bag is black, with my passport and wallet inside. — 包是黑色的，里面有护照和钱包。',
      'I didn\'t see the person clearly. — 我没看清那个人。',
    ],
    [
      'Could you send the police, please? — 能派警察来吗？',
      'Should I go to the embassy as well? — 我也该去大使馆吗？',
      'Please speak more slowly. — 请说慢一点。',
    ],
    [
      'Where should I wait? — 我应该在哪里等？',
      'Can I have a case number? — 能给我案件编号吗？',
      'Thank you, I\'ll stay on the line. — 谢谢，我先不挂电话。',
    ],
  ],
}

const SCENE_NEXT: Record<string, string[]> = {
  'airport-checkin': [
    'Thank you. Where are you flying today, and is this your final destination?\n试试：报目的地，并询问能不能选靠窗或靠过道的座位。',
    'I can give you 24C, an aisle seat. Will you check any bags today?\n试试：说明行李件数，并问是否超重。',
    'Your bag is 1.5 kilos over. Would you like to pay the extra fee or move some items?\n试试：选择一种处理方式，并问登机口。',
    'You\'re all set. Boarding starts at 10:40 at gate B12. Anything else?\n试试：确认时间与登机口，并礼貌道谢离开。',
  ],
  immigration: [
    'How long will you stay, and where are you staying?\n试试：说停留天数和住宿地点。',
    'Are you traveling with anyone? Do you have a return ticket?\n试试：简短回答，并在需要时出示回程信息。',
    'Are you bringing any food, plants, or gifts to declare?\n试试：如实说明行李，听不清就请对方再说一遍。',
    'Thank you. Please go to the customs channel on your left.\n试试：确认该走哪条通道，并礼貌结束。',
  ],
  restaurant: [
    'Sure. Today the soup and the grilled salmon are popular. Any allergies I should know?\n试试：点一道菜，并说明过敏或忌口。',
    'Good choice. Would you like that spicy, and anything to drink?\n试试：说辣度偏好，并点饮料。',
    'Of course. I\'ll take this back. Would you like the pasta or a salad instead?\n试试：换一道菜，或请对方推荐。',
    'Here is the bill. Would you like to pay by card or cash?\n试试：说明付款方式并致谢。',
  ],
  directions: [
    'The old town is about 15 minutes on foot. Do you want the walking route or the subway?\n试试：选一种方式，并问第一部该怎么走。',
    'Go straight two blocks, then turn left at the bakery. You\'ll see a stone church.\n试试：重复路线来确认，并问要走多久。',
    'Yes — after the church, the square is on your right. Need me to show the map?\n试试：请对方指一下，或问最近的地铁站。',
    'You\'re welcome. If you get lost, look for the river and follow it south.\n试试：道谢，并确认自己走的方向对不对。',
  ],
  hotel: [
    'I have you for two nights in a double. Breakfast is included. A window or courtyard room?\n试试：选房间，并问 Wi-Fi 或退房时间。',
    'Wi-Fi is HotelGuest / travel2026. Checkout is 11 a.m. Here is your key, room 412.\n试试：确认信息；如果要练习投诉，可以说房间有问题。',
    'I\'m sorry about that. I can send someone up, or move you to 508, which is quieter.\n试试：选择修理或换房，并问大概几点处理。',
    'We\'ll move you in 20 minutes and hold your luggage. Anything else we can do?\n试试：确认时间，询问早餐地点或延迟退房。',
  ],
  shopping: [
    'Yes, this one is 49. We have medium in blue and black. Want to try it on?\n试试：选颜色/尺码，并问面料或能否试穿。',
    'The fitting room is at the back. It looks good. The sale price is 49, tax included.\n试试：问能不能便宜一点，或是否接受砍价。',
    'Hmm, I can do 42 if you take it today. Cash or card?\n试试：接受或再还一个价，并问退换规则。',
    'Done — 42. Here is your receipt. No returns on sale items after 7 days.\n试试：确认付款并致谢。',
  ],
  doctor: [
    'I see. How long have you had this, and do you have a fever or cough?\n试试：补充时间和主要症状。',
    'Any allergies or medicine you take every day? Does it hurt to swallow?\n试试：说明过敏、用药，并指出疼痛位置。',
    'This is likely a viral infection. I\'ll give you something for the fever. Any questions?\n试试：问用法、次数，或什么时候需要再来。',
    'Take one tablet after breakfast and dinner for three days. Come back if it gets worse.\n试试：重复医嘱确认，并致谢。',
  ],
  taxi: [
    'Central Station, got it. Should I take the main road or avoid the traffic?\n试试：选路线，并请司机打表或确认车费。',
    'About 20 minutes with this traffic. Card is fine. Need the AC on?\n试试：回答偏好，或提醒走你熟悉的路。',
    'Ah, sorry — I\'ll turn around at the next lights. Still Central Station, right?\n试试：礼貌确认目的地，或请对方在前面停。',
    'That\'s 18.50. Card machine is here. Do you need a receipt?\n试试：付款、要收据，并致谢下车。',
  ],
  tickets: [
    'Two adults. Today\'s 3 p.m. slot is open. Student ID for a discount?\n试试：确认时段，询问学生票或包含项目。',
    'This ticket includes the main halls, not the tower. The tower is 8 extra.\n试试：决定是否加购，并问入口和拍照规定。',
    'Last entry is 4:30. The entrance is around the left corner. Card or cash?\n试试：买票付款，并确认最晚入场时间。',
    'Here are your tickets and a map. Enjoy your visit!\n试试：致谢，并确认从哪扇门进去。',
  ],
  emergency: [
    'I\'m sorry that happened. Are you in a safe place? What exactly was taken?\n试试：说明安全情况、丢失物品和地点。',
    'A black bag with a passport and wallet. I\'ll send an officer to the north exit.\n试试：补充时间、有没有看清对方，并请求警察或使馆信息。',
    'Stay where you are. An officer will arrive in about ten minutes. Do you need an interpreter?\n试试：确认等候地点，请对方说慢一点，或询问下一步。',
    'Ask the officer for a police report. You\'ll need it for the embassy and your cards.\n试试：确认要哪些文件，并致谢。',
  ],
}

function polishEnglish(text: string): string {
  let line = text.trim().replace(/\s+/g, ' ')
  if (!line) return 'Sorry, could you say that again?'

  line = line
    .replace(/\bi\b/g, 'I')
    .replace(/\bi'd\b/gi, "I'd")
    .replace(/\bi'm\b/gi, "I'm")
    .replace(/\bi'll\b/gi, "I'll")
    .replace(/\bive\b/gi, "I've")
    .replace(/\bcant\b/gi, "can't")
    .replace(/\bdont\b/gi, "don't")
    .replace(/\bwont\b/gi, "won't")
    .replace(/\bi want\b/gi, "I'd like")
    .replace(/\bgive me\b/gi, 'Could I have')
    .replace(/\bi allergic\b/gi, "I'm allergic to")
    .replace(/^how much\b/i, 'How much')

  line = line.charAt(0).toUpperCase() + line.slice(1)
  if (!/[.?!]$/.test(line)) line += '.'
  return line
}

function looksChinese(text: string): boolean {
  return /[\u4e00-\u9fff]/.test(text)
}

export function buildDemoReply(scene: Scene, userText: string, turnIndex: number): CoachReply {
  const i = Math.max(0, turnIndex) % 4
  const tips = SCENE_TIPS[scene.id] ?? SCENE_TIPS['airport-checkin']
  const phrases = SCENE_PHRASES[scene.id] ?? SCENE_PHRASES['airport-checkin']
  const next = SCENE_NEXT[scene.id] ?? SCENE_NEXT['airport-checkin']

  const rewrite = looksChinese(userText)
    ? 'I\'d like to continue in English. Could you help me with the next step, please?'
    : polishEnglish(userText)

  const tip = looksChinese(userText)
    ? '先用英语写简单句：主语 + 动词 + 宾语。例：I\'d like a window seat, please.'
    : (tips?.[i] ?? '用 I\'d like 代替 I want，听起来更礼貌。例：I\'d like some water, please.')

  return {
    rewrite,
    tip,
    phrases: phrases?.[i] ?? phrases[0],
    next_prompt: next?.[i] ?? next[0],
  }
}
