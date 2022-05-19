export const getBackgroundColor = (tier: string) => {
  switch (tier) {
    case "Bronze":
      return "#683400"
    case "Silver":
      return "#485460"
    case "Gold":
      return "#EA9800"
    case "Platinum":
      return "#08C586"
    case "Diamond":
      return "#009EDD"
    case "Ruby":
      return "#D00050"
    default:
      return "#000000"
  }
}