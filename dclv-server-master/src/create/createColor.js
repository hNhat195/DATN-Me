const { Color } = require("../models/Color");
const { FabricRoll } = require("../models/FabricRoll");
listColor = [
  "Teal Green",
  "Eggplant",
  "Weldon Blue",
  "Freekeh",
  "Oak",
  "Black",
  "Day Blue",
  "Beige",
  "Madder",
  "Fluro Melon",
  "Greenfinch",
  "Amber",
  "Chianti",
  "Strawberry",
  "Kingfisher",
  "Puce",
  "Ballet",
  "Pastel Blue",
  "Canary",
  "Cotton Satin - Ballet",
  "Viscose Satin - Ballet",
  "Kumquat",
  "Pine",
  "Seashell",
  "Praline",
  "Warm Ivory",
  "Dark Chocolate",
  "Light Cream",
  "Viscose Jacquard - Ivory",
  "Cream",
  "Ivory",
  "Multi",
  "Purple",
  "Dark Navy",
  "Deep Ocean",
  "Midnight",
  "Brown",
  "Alpine Pasture",
  "Bright Coral",
  "Ocelot / B",
  "Pepper / A",
  "Andria / X",
  "Tempo / A",
  "Moon Dance / B",
  "Achilles / B",
  "Achilles / C",
  "Tempo / B",
  "Tempo / C",
  "Dapple / C",
  "Transformation / C-CW",
  "White / Lime",
  "Soy",
  "Succulent",
  "Pearlescent Mint",
  "Laurel Green",
  "Nectarine",
  "Wedgewood",
  "Parma Violet",
  "Wedgewood",
  "Lemon",
  "Mint",
  "Amethyst",
  "Doll Pink",
  "Jazzberry Jam",
  "Russet",
  "Passionflower",
  "Sage",
  "Wedgewood",
  "White",
  "Blue",
  "Yale",
  "Biscuit",
  "Butter",
  "Greensmoke",
  "Cinereous",
  "Zomp",
  "Sapphire",
  "Gunmetal",
  "Navy",
  "Sky",
  "Apricot",
  "Pink",
  "Red",
  "Yellow",
];
const createColorFabric = async () => {
  listColor.forEach(async (element) => {
    await Color.create(
      {
        colorCode: element,
      },
      function (err, data) {
        if (err) console.log(err);
        else console.log(data);
      }
    );
  });
  //   await FabricRoll.deleteMany();
};

module.exports = { createColorFabric };