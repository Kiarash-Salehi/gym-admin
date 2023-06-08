function getRemainingSessions(member) {
  if (member?.plans && member?.plans?.length > 0) {
    const currentPlan = member.plans.find((plan) => {
      const now = new Date();
      return plan.start <= now && plan.end >= now;
    });
    return currentPlan ? currentPlan.remainingSessions : 0;
  } else {
    return 0;
  }
}
