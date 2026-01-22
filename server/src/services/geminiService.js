exports.generateWithGemini = async (profile, business) => {
  return {
    subject: `Helping ${business.name} grow`,
    body: `Hi ${business.name},

I noticed your business in the ${business.category || "industry"} space.
I specialize in ${profile.skills.join(", ")} and would love to help.

Best regards,
${profile.name}
`,
  };
};
