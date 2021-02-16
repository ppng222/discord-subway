const express = require("express");
const app = express();
app.use(express.json()); // json body middle-ware
app.use(express.static("public"));
app.get("/wakeup", (request, response) => {
    return response.send("!")
});
const Discord = require("discord.js");
const client = new Discord.Client({ disableMentions: "none" });
var prefix = "sub.";
var breads = {
  // bread
  italian_top:
    "https://media.subway.com/digital/Account_Updates/Assets/App-Base/Web_Images/Subway/en-us/Options/o_BreadItalian_customizer_large.png",
  italian_bottom:
    "https://media.subway.com/digital/Account_Updates/Assets/App-Base/Web_Images/Subway/en-us/Options/o_BreadItalian_customizer_large_bottom.png",
  jalapeno_cheddar_top:
    "https://media.subway.com/digital/Account_Updates/Assets/App-Base/Web_Images/Subway/en-us/Options/o_BreadJalapenoCheddar_customizer_large.png",
  jalapeno_cheddar_bottom:
    "https://media.subway.com/digital/Account_Updates/Assets/App-Base/Web_Images/Subway/en-us/Options/o_BreadJalapenoCheddar_customizer_large_bottom.png",
  nine_grain_wheat_top:
    "https://media.subway.com/digital/Account_Updates/Assets/App-Base/Web_Images/Subway/en-us/Options/o_BreadWheat_customizer_large.png",
  nine_grain_wheat_bottom:
    "https://media.subway.com/digital/Account_Updates/Assets/App-Base/Web_Images/Subway/en-us/Options/o_BreadWheat_customizer_large_bottom.png",
  honey_oat_top:
    "https://media.subway.com/digital/Account_Updates/Assets/App-Base/Web_Images/Subway/en-us/Options/o_BreadHOWheat_customizer_large.png",
  honey_oat_bottom:
    "https://media.subway.com/digital/Account_Updates/Assets/App-Base/Web_Images/Subway/en-us/Options/o_BreadHOWheat_customizer_large_bottom.png",
  italian_herbs_and_cheese_top:
    "https://media.subway.com/digital/Account_Updates/Assets/App-Base/Web_Images/Subway/en-us/Options/o_BreadItalianHerb_customizer_large.png",
  italian_herbs_and_cheese_bottom:
    "https://media.subway.com/digital/Account_Updates/Assets/App-Base/Web_Images/Subway/en-us/Options/o_BreadItalianHerb_customizer_large_bottom.png",
  cum_bread_top:
    "https://cdn.glitch.com/a16faf11-7b2c-4dc9-bc4c-e8700433d123%2FBreadCumTop.png",
  cum_bread_bottom:
    "https://cdn.glitch.com/a16faf11-7b2c-4dc9-bc4c-e8700433d123%2FBreadCumBottom.png"
};
var sandwiches = require("./custom_sandwich_data.json");
function add_a_sandwich(message,args){
  
}
function make_a_sandwich(message, args) {
  var bread_top = breads[args[0] + "_top"];
  var bread_bottom = breads[args[0] + "_bottom"];

  message.channel.send(bread_top); // send the top bread first

  for (var i = args.length - 1; i > 0; i--) {
    // this sends meats and cheeses
    var topping =
      "https://cdn.glitch.com/a16faf11-7b2c-4dc9-bc4c-e8700433d123/" +
      args[i] +
      ".png";
    console.log(topping);
    message.channel.send(topping);
  }

  message.channel.send(bread_bottom); //send the bottom bread after toppings
  return;
}

// 'client.on('message')' commands are triggered when the
// specified message is read in a text channel that the bot is in.
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "make") {
    if (!args.length) {
      return message.channel.send(
        `You didn't provide any ingredients, ${message.author}!`
      );
    } else {
      make_a_sandwich(message, args);
    }
  } else if (command === "help") {
    message.channel.send("Create a sandwich with the following format:");
    message.channel.send("sub.make {bread} [meats] {cheese} [veggies]");
    message.channel.send("Use a sandwich preset with sub.make_sandwich");
  } else if (command == "ingredients") {
    message.channel.send(
      "Breads:\n\tItalian\n\tItalian Herbs and Cheese\n\tNine Grain Wheat\n\tJalapeno Cheddar\n\tHoney Oat\nCheeses: \n\tAmerican\n\tMonterey\n\tPepperjack\n\tProvolone\n\tMozzarella\nMeats:\n\tChicken Strips\n\tCold Cut\n\tHam\n\tOven Roasted Chicken\n\tSalami\n\tSteak\n\tTuna\n\tRib Patty\n\tTurkey\n\tMeatball Marinara\n\tPepperoni\nVeggies:\n\tAvocados\n\tBacon\n\tBanana Peppers\n\tCarrots\n\tOlives\n\tRed Onions\n\tSpinach\n\tTomato\n\tCucumbers\n\tGreen Peppers\n\tGuac\n\tJalapenos\n\tLettuce\n\tMushroom\n\tPickles\nSauces:\n\tBarbeque\n\tChipotle Southwest\n\tCreamy Sriracha\n\tMustard\n\tOil\n\tRed Wine Vinegar\n\tSweet Onion\n\tMayo\n\t"
    );
  } else if (command == "make_sandwich") {
    if (!args.length) {
      return message.channel.send(
        `You didn't provide a sandwich, ${message.author}!`
      );
    } else {
      var sand_args = sandwiches[args[0]];
      make_a_sandwich(message, sand_args);
    }
  } else if (command == "make_sandwich_preset"){
     if (!args.length) {
      return message.channel.send(
        `You didn't provide any ingredients, ${message.author}!`
      );
    } else{
      message.channel.send(args)
    }
  }
});

client.login(process.env.token);
