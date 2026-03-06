export const sparkRoles = [
    { value: 1, label: "Level 01: Team Member / Barista / Baker" },
    { value: 2, label: "Level 02: Team Leader / Head Baker / Head Barista" },
    { value: 3, label: "Level 03: Assistant Bakery Manager" },
    { value: 4, label: "Level 04: Bakery Manager" },
    { value: 5, label: "Level 05: Group Manager / Operations Manager" },
  ];
  
  export const sparkScale = [
    { value: "1", label: "1 - Needs Significant Improvement" },
    { value: "2", label: "2 - Developing" },
    { value: "3", label: "3 - Meets Expectations" },
    { value: "4", label: "4 - Exceeds Expectations" },
    { value: "5", label: "5 - Outstanding" },
  ];
  
  export const sparkSurveyData = [
    {
      id: "value",
      title: "VALUE",
      subtitle: "Leading with Drive",
      commentPrompt: "Examples or comments on this person's drive:",
      levels: [
        {
          level: 1,
          title: "Level 01: Passion",
          subtitle: "Love GAIL's, hardworking, pace",
          questions: [
            { id: "v_1_1", text: "Works at a consistently high pace, even during peak trading periods." },
            { id: "v_1_2", text: "Shows genuine passion for GAIL's products, brand and values." },
            { id: "v_1_3", text: "Takes initiative without waiting to be directed by others." },
            { id: "v_1_4", text: "Handles pressure well and remains committed when things get busy." },
          ]
        },
        {
          level: 2,
          title: "Level 02: Taking Charge",
          subtitle: "Fair, role model, sets realistic expectations",
          questions: [
            { id: "v_2_5", text: "Is dependable and resilient, especially under pressure." },
            { id: "v_2_6", text: "Is fair, thoughtful and leads by example on the floor." },
            { id: "v_2_7", text: "Takes on new or different responsibilities willingly." },
            { id: "v_2_8", text: "Thinks logically and remains confident when making decisions." },
          ]
        },
        {
          level: 3,
          title: "Level 03: Achieving",
          subtitle: "Hands-on approach, manages change, results orientated",
          questions: [
            { id: "v_3_9", text: "Manages change effectively and encourages others to embrace it." },
            { id: "v_3_10", text: "Provides clear direction so people know what is expected of them." },
            { id: "v_3_11", text: "Delegates responsibility effectively and follows up on outcomes." },
            { id: "v_3_12", text: "Acts with conviction and takes a hands-on approach to results." },
          ]
        },
        {
          level: 4,
          title: "Level 04: Decision Making",
          subtitle: "Driven, empowering, embeds change",
          questions: [
            { id: "v_4_13", text: "Benchmarks performance against other bakeries to understand and improve." },
            { id: "v_4_14", text: "Deals effectively with uncertainty and frustration without losing focus." },
            { id: "v_4_15", text: "Considers both long-term and short-term implications of decisions." },
            { id: "v_4_16", text: "Drives and embeds change in a way that brings the team along." },
            { id: "v_4_17", text: "Empowers others to take ownership rather than being controlling." },
          ]
        },
        {
          level: 5,
          title: "Level 05: Setting Direction",
          subtitle: "Builds on previous successes, establishes direction, sets new ways",
          questions: [
            { id: "v_5_18", text: "Sets challenging levels of performance aligned to strategic objectives." },
            { id: "v_5_19", text: "Helps their teams understand the shared vision and common goal." },
            { id: "v_5_20", text: "Manages conflicting pressures and tensions effectively." },
            { id: "v_5_21", text: "Strives for achievement and builds on previous successes." },
            { id: "v_5_22", text: "Implements business decisions effectively across their area." },
          ]
        }
      ]
    },
    {
      id: "structure",
      title: "STRUCTURE",
      subtitle: "Leading to Deliver",
      commentPrompt: "Examples or comments on this person's delivery and standards:",
      levels: [
        {
          level: 1,
          title: "Level 01: Reliable",
          subtitle: "Follows rules, high standards, on-time",
          questions: [
            { id: "s_1_1", text: "Demonstrates a strong understanding of GAIL's standards and role expectations." },
            { id: "s_1_2", text: "Delivers quality in everything they do, from product to service." },
            { id: "s_1_3", text: "Prioritises tasks well and manages their time effectively." },
            { id: "s_1_4", text: "Is punctual, reliable and consistent in attendance and performance." },
          ]
        },
        {
          level: 2,
          title: "Level 02: Great Execution",
          subtitle: "Organised, effective, trustworthy",
          questions: [
            { id: "s_2_5", text: "Plans and organises their own work and the shift effectively." },
            { id: "s_2_6", text: "Achieves results and meets deadlines consistently." },
            { id: "s_2_7", text: "Delivers a high quality of work that can be trusted." },
            { id: "s_2_8", text: "Uses resources (stock, labour, equipment) effectively with minimal waste." },
          ]
        },
        {
          level: 3,
          title: "Level 03: Responsible",
          subtitle: "Logical, efficient, high standards",
          questions: [
            { id: "s_3_9", text: "Holds themselves to a high professional standard in all aspects of the role." },
            { id: "s_3_10", text: "Manages workload efficiently across daily, weekly and longer-term tasks." },
            { id: "s_3_11", text: "Demonstrates sound judgement and follows plans through to completion." },
            { id: "s_3_12", text: "Maintains high standards in product quality, safety and bakery presentation." },
          ]
        },
        {
          level: 4,
          title: "Level 04: Accountable",
          subtitle: "Strong foundation, problem solving, planning & follow through",
          questions: [
            { id: "s_4_13", text: "Develops and monitors structured plans to achieve goals." },
            { id: "s_4_14", text: "Plans effectively across day, week, month and quarter horizons." },
            { id: "s_4_15", text: "Holds themselves and others to account to meet performance standards." },
            { id: "s_4_16", text: "Understands what drives customer behaviour and acts on this knowledge." },
            { id: "s_4_17", text: "Considers costs and budgets when making planning decisions." },
          ]
        },
        {
          level: 5,
          title: "Level 05: Advocate",
          subtitle: "Connects arguments logically, sets objectives, planning & prioritising",
          questions: [
            { id: "s_5_18", text: "Brings clarity and order and is aware of market conditions." },
            { id: "s_5_19", text: "Makes and implements plans that allocate resources precisely." },
            { id: "s_5_20", text: "Looks for obstacles and develops good contingency plans." },
            { id: "s_5_21", text: "Plans effectively across day, week, month, quarter and year." },
            { id: "s_5_22", text: "Identifies and implements better working practices across their area." },
            { id: "s_5_23", text: "Looks for opportunities to reduce costs and improve efficiency." },
          ]
        }
      ]
    },
    {
      id: "relations",
      title: "RELATIONS",
      subtitle: "Leading through People",
      commentPrompt: "Examples or comments on this person's people skills:",
      levels: [
        {
          level: 1,
          title: "Level 01: Teamwork",
          subtitle: "Kind, personable, helpful",
          questions: [
            { id: "r_1_1", text: "Is kind and supportive towards colleagues across all roles." },
            { id: "r_1_2", text: "Actively helps others without needing to be asked." },
            { id: "r_1_3", text: "Takes other people's views and ideas into account." },
            { id: "r_1_4", text: "Asks for and accepts help when they need it." },
          ]
        },
        {
          level: 2,
          title: "Level 02: Developing Others",
          subtitle: "Supportive, realising potential, training",
          questions: [
            { id: "r_2_5", text: "Builds good working relationships by offering support and advice." },
            { id: "r_2_6", text: "Shows genuine interest in training and developing the team." },
            { id: "r_2_7", text: "Can spot potential in others and helps them grow." },
            { id: "r_2_8", text: "Is an effective trainer who adapts to different learning styles." },
          ]
        },
        {
          level: 3,
          title: "Level 03: Team Builder",
          subtitle: "Builds confidence, skill & capacity",
          questions: [
            { id: "r_3_9", text: "Is good at recognising talent and future capability within the team." },
            { id: "r_3_10", text: "Develops people effectively towards their next role or responsibility." },
            { id: "r_3_11", text: "Knows when to be hands-on and when to step back and empower others." },
            { id: "r_3_12", text: "Coaches others to improve performance and avoids favouritism." },
          ]
        },
        {
          level: 4,
          title: "Level 04: Coach",
          subtitle: "Stretching, encouraging, honest",
          questions: [
            { id: "r_4_13", text: "Builds trust and confidence within the team." },
            { id: "r_4_14", text: "Dedicates meaningful time to coaching and developing others." },
            { id: "r_4_15", text: "Creates an environment where people can learn from their mistakes safely." },
            { id: "r_4_16", text: "Conducts effective one-to-one conversations and gives constructive feedback." },
            { id: "r_4_17", text: "Acknowledges and rewards team achievements and individual contributions." },
          ]
        },
        {
          level: 5,
          title: "Level 05: Guru",
          subtitle: "Aware of how people & situations connect, react & progress",
          questions: [
            { id: "r_5_18", text: "Engages input from others constantly and listens with empathy and concern." },
            { id: "r_5_19", text: "Is aware of and involved in co-creating organisational culture." },
            { id: "r_5_20", text: "Supports and encourages people to question habits and propose better ways." },
            { id: "r_5_21", text: "Understands interpersonal and group dynamics and develops strong succession plans." },
            { id: "r_5_22", text: "Spends sufficient time coaching and developing their teams." },
          ]
        }
      ]
    },
    {
      id: "ideas",
      title: "IDEAS",
      subtitle: "Leading with Vision",
      commentPrompt: "Examples or comments on this person's vision and communication:",
      levels: [
        {
          level: 1,
          title: "Level 01: Adaptable",
          subtitle: "Has initiative, is positive, wants to learn",
          questions: [
            { id: "i_1_1", text: "Shows enthusiasm and a positive attitude in their day-to-day work." },
            { id: "i_1_2", text: "Responds well to change and adapts to new ways of working." },
            { id: "i_1_3", text: "Asks for advice and feedback when they need it." },
            { id: "i_1_4", text: "Shows a genuine desire to learn, grow and develop their skills." },
          ]
        },
        {
          level: 2,
          title: "Level 02: Clear Talking",
          subtitle: "Conversational, tactful, clear",
          questions: [
            { id: "i_2_5", text: "Communicates clearly and in a way that is easy to follow." },
            { id: "i_2_6", text: "Listens well and shows sensitivity and empathy towards others." },
            { id: "i_2_7", text: "Is open, approachable and easy to talk to." },
            { id: "i_2_8", text: "Is customer focused and considers customer needs in their communication." },
          ]
        },
        {
          level: 3,
          title: "Level 03: Charismatic",
          subtitle: "Outgoing, communicative, charming",
          questions: [
            { id: "i_3_9", text: "Has warmth and a sense of humour that puts others at ease." },
            { id: "i_3_10", text: "Engages naturally with both customers and colleagues." },
            { id: "i_3_11", text: "Is comfortable leading conversations and contributing ideas." },
            { id: "i_3_12", text: "Deals with problems proactively rather than complaining about them." },
          ]
        },
        {
          level: 4,
          title: "Level 04: Inspiring",
          subtitle: "Credible, transparent communication, creates optimism",
          questions: [
            { id: "i_4_13", text: "Keeps the whole team well informed through clear, regular communication." },
            { id: "i_4_14", text: "Shares ideas in a compelling way that gains buy-in from others." },
            { id: "i_4_15", text: "Handles unforeseen events calmly while reassuring the team." },
            { id: "i_4_16", text: "Is a genuine ambassador of the GAIL's brand, philosophy and values." },
            { id: "i_4_17", text: "Develops strong working partnerships across the wider business." },
          ]
        },
        {
          level: 5,
          title: "Level 05: Transformative",
          subtitle: "Facilitates openness, has ability to improvise, is courageous",
          questions: [
            { id: "i_5_18", text: "Can handle multiple issues at the same time and facilitate a way forward." },
            { id: "i_5_19", text: "Deals with difficult conversations tactfully and with confidence." },
            { id: "i_5_20", text: "Adapts their style to match the needs of others." },
            { id: "i_5_21", text: "Is outgoing, genuine and courageous in their approach." },
            { id: "i_5_22", text: "Is effective when implementing corporate decisions across their area." },
          ]
        }
      ]
    }
  ];
  
  export const sparkOverallSummary = [
    { id: "sum_1", text: "What does this person do well? What should they keep doing?" },
    { id: "sum_2", text: "What could this person improve or do differently?" },
    { id: "sum_3", text: "If you could suggest one focus area for this person over the next three months, what would it be?" },
  ];