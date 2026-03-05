export const performanceSurveyData = {
    scale: [
      { value: "1", label: "1 - Needs Development" },
      { value: "2", label: "2 - Developing" },
      { value: "3", label: "3 - Meets Expectations" },
      { value: "4", label: "4 - Exceeds Expectations" },
    ],
    categories: [
      {
        id: "customer_service",
        title: "Customer Service",
        questions: [
          { id: "cs_1", text: "Greets every customer warmly and makes them feel welcome in the bakery." },
          { id: "cs_2", text: "Actively listens to customer requests and responds with care and attention." },
          { id: "cs_3", text: "Handles customer complaints calmly and turns negative experiences into positive ones." },
          { id: "cs_4", text: "Confidently recommends products and upsells in a natural, genuine way." },
          { id: "cs_5", text: "Demonstrates knowledge of allergens, dietary requirements, and product ingredients when asked." },
        ]
      },
      {
        id: "coffee_barista",
        title: "Coffee & Barista Skills",
        questions: [
          { id: "cb_1", text: "Produces consistently high-quality espresso-based drinks to GAIL's standards." },
          { id: "cb_2", text: "Manages milk steaming, latte art, and drink presentation to a professional standard." },
          { id: "cb_3", text: "Keeps the coffee machine clean, calibrated, and well-maintained throughout the day." },
          { id: "cb_4", text: "Works efficiently on the coffee machine during peak trade without sacrificing quality." },
          { id: "cb_5", text: "Demonstrates strong product knowledge of GAIL's coffee origins, blends, and brew methods." },
        ]
      },
      {
        id: "operations",
        title: "Operations & Speed of Service",
        questions: [
          { id: "op_1", text: "Follows GAIL's operational procedures accurately and consistently." },
          { id: "op_2", text: "Works with urgency during peak periods and maintains a strong pace throughout the shift." },
          { id: "op_3", text: "Manages their section or station effectively, keeping queues moving and customers served promptly." },
          { id: "op_4", text: "Completes opening, mid-shift, and closing routines to the required standard and on time." },
          { id: "op_5", text: "Proactively identifies and removes bottlenecks in service flow." },
        ]
      },
      {
        id: "interpersonal",
        title: "Interpersonal Skills & Emotional Intelligence",
        questions: [
          { id: "eq_1", text: "Communicates clearly and respectfully with colleagues at all levels." },
          { id: "eq_2", text: "Remains calm and composed under pressure, especially during busy periods." },
          { id: "eq_3", text: "Shows empathy and awareness of how their behaviour impacts others in the team." },
          { id: "eq_4", text: "Gives and receives feedback constructively, without becoming defensive." },
          { id: "eq_5", text: "Builds positive working relationships across the bakery team." },
        ]
      },
      {
        id: "collaboration",
        title: "Collaboration & Supportive Behaviours",
        questions: [
          { id: "col_1", text: "Actively helps colleagues during busy periods without being asked." },
          { id: "col_2", text: "Contributes to a positive team atmosphere and lifts the morale of those around them." },
          { id: "col_3", text: "Shares workload fairly and steps in to support others who are struggling." },
          { id: "col_4", text: "Celebrates team successes and recognises the contributions of others." },
          { id: "col_5", text: "Resolves disagreements or tension within the team constructively." },
          { id: "col_6", text: "Shows genuine care for the wellbeing of colleagues and checks in on team members." },
        ]
      },
      {
        id: "leadership",
        title: "Leadership Potential & Capability",
        questions: [
          { id: "ld_1", text: "Takes ownership of their section and leads by example on shift." },
          { id: "ld_2", text: "Supports and motivates team members, especially during challenging periods." },
          { id: "ld_3", text: "Confidently delegates tasks and follows up to ensure completion." },
          { id: "ld_4", text: "Makes sound decisions under pressure without always needing to escalate." },
          { id: "ld_5", text: "Actively contributes ideas to improve the bakery's performance and culture." },
        ]
      },
      {
        id: "reliability",
        title: "Reliability & Flexibility",
        questions: [
          { id: "rel_1", text: "Arrives on time, is consistent with attendance, and is ready to work." },
          { id: "rel_2", text: "Willingly covers shifts, changes stations, or adjusts plans when the bakery needs it." },
          { id: "rel_3", text: "Can be trusted to complete tasks independently without constant supervision." },
          { id: "rel_4", text: "Responds positively to last-minute changes in rota, responsibilities, or priorities." },
          { id: "rel_5", text: "Follows through on commitments and is accountable for their own performance." },
        ]
      },
      {
        id: "adaptability",
        title: "Adaptability & Initiative",
        questions: [
          { id: "adp_1", text: "Adapts quickly to new products and seasonal changes without losing quality." },
          { id: "adp_2", text: "Identifies problems early and takes action before being asked." },
          { id: "adp_3", text: "Suggests improvements to processes, displays, or ways of working." },
          { id: "adp_4", text: "Handles unexpected situations calmly and resourcefully." },
          { id: "adp_5", text: "Seeks out learning opportunities and actively works on their own development." },
        ]
      },
      {
        id: "coaching",
        title: "Coaching, Teaching & Knowledge",
        questions: [
          { id: "ct_1", text: "Effectively trains and onboards new team members with patience and clarity." },
          { id: "ct_2", text: "Shares product knowledge, recipes, and bakery standards with the wider team." },
          { id: "ct_3", text: "Gives clear, specific feedback that helps others improve their performance." },
          { id: "ct_4", text: "Demonstrates strong knowledge of brand values, menu, and seasonal offerings." },
          { id: "ct_5", text: "Understands and can explain key bakery KPIs such as NPS, waste, and labour targets." },
        ]
      },
      {
        id: "organisation",
        title: "Organisation & Standards",
        questions: [
          { id: "org_1", text: "Keeps their work area tidy, well-stocked, and visually appealing at all times." },
          { id: "org_2", text: "Follows merchandising and display standards for bread, pastries, and counter presentation." },
          { id: "org_3", text: "Manages their time effectively, balancing multiple tasks without dropping standards." },
          { id: "org_4", text: "Ensures accurate stock counts, deliveries, and waste recording." },
          { id: "org_5", text: "Upholds brand standards in personal presentation, uniform, and bakery appearance." },
        ]
      },
      {
        id: "hygiene",
        title: "Hygiene & Cleanliness",
        questions: [
          { id: "hyg_1", text: "Follows all food safety and hygiene procedures consistently." },
          { id: "hyg_2", text: "Maintains cleaning schedules and ensures the bakery passes internal and external audits." },
          { id: "hyg_3", text: "Takes pride in the cleanliness of the front of house, back of house, and customer areas." },
          { id: "hyg_4", text: "Proactively cleans and tidies during quieter periods without being prompted." },
          { id: "hyg_5", text: "Ensures correct storage, labelling, and date rotation of all food products." },
        ]
      }
    ],
    openEnded: [
      { id: "oe_1", text: "What does this person do particularly well? What are their key strengths?" },
      { id: "oe_2", text: "What is one area where this person could improve or develop further?" },
      { id: "oe_3", text: "Can you share a specific example of when this person positively impacted the team, a customer, or the bakery's performance?" },
      { id: "oe_4", text: "Is there anything else you would like to share about working with this person?" },
    ]
  };