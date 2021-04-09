const botSettings = require("./botsettings.json");
const list = require("./lists.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;
favemoji = null;
const tyler = botSettings.tyler;
const bot = new Discord.Client();
const { Client, Attachment } = require('discord.js');
//This Is called with !staff and Starts a Thread
const helpEmbed = new Discord.RichEmbed()
.setColor('#0099ff')
.setTitle('Thread Created')
.setDescription('Our Staff Team Will Get Back To You As Soon As Possible')
.setTimestamp()
    .setFooter('To Close Thread Push The Lock Button', 'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1024px-Flag_of_Germany.svg.png');
const rulesembed = new Discord.RichEmbed()
    .setTitle('Rules')
    .addField("\u200b","Welcome To the Pizza Server!")
    .addField("\u200b", "Be sure to follow the server rules below:", null)
    .addField("\u200b" ,"1. Be respectful of others, especially staff.", null)
    .addField("\u200b", "2. No swearing, cursing, foul language, or sexual implications.")
    .addField("\u200b", "3. Listen to staff. ")
    .addField("\u200b", "4. No spam except for in pizza-spam.")
    .addField("\u200b", "5. Love pizza!")
    .addField("\u200b", "We hope you enjoy your time here. If you have any questions,")
    .addField("\u200b", "do \"!help\" and our bot will respond to you.")
    .addField("\u200b", "If you have suggestions,")
    .addField("\u200b", "do \"`suggestion\" and our bot will send a form to you")
    .setTimestamp();
//This is Called to end a Thread

const noEmbed = new Discord.RichEmbed()
.setColor('#0099ff')
.setTitle('Thread Closed')
.setDescription('Thread Has Been Closed')
.setTimestamp()
.setFooter('To Open a new Thread Say !help', 'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1024px-Flag_of_Germany.svg.png');
//This Makes A random number!
function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low)
}
bot.on("ready", async () => {
	console.log(`Bot is ready! ${bot.user.username}`);
try {
	 let link = await bot.generateInvite(["ADMINISTRATOR"]);
	 console.log(link);
} catch(e) {
	console.log(e.stack);
    }
    bot.on('guildMemberAdd', member => {

        // Send the message, mentioning the member
        member.send(`Welcome ${member} Please read the rules`);
        member.send(rulesembed);
        member.addRole('700490085820399628');
    });
});
bot.on("message", async message => {
    /*if (message.content === `${prefix}rollup`) {
        message.member.addRole('700492731683962950');
        console.log("rollingup");
    }*/
    // if (message.member.roles.find(r => r.name === "Mute")) {
    //     message.delete();
    //     message.author.send("Sorry You have been muted from chat")
    // }
    // if (message.member.roles.find(r => r.name === "Mute")) return;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    args = messageArray.slice(1);
    let num = messageArray[1];
    let tran = messageArray.slice(0);
    // This is so you can create a filter
    /*if (message.content.includes("Enter Your Word Here")) {
      message.delete();
      message.channel.send("Please do not say that");  
      
    }*/


    //this will make your code stop if it does not have a prifix
    if (!command.startsWith(prefix)) return;
    //This will print out the users info
    if (command === `${prefix}userinfo`) {
        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.username)
            .setDescription("This is the user's info!")
            .setColor("#0066ff")
            .addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
            .addField("ID", message.author.id)
            .addField("Created At", message.author.createdAt)
            .setTimestamp();
        message.channel.send(embed);
    }
    justprefix = false;
    //this will make it so if they just enter the prefix it will tell them they need a command
    if (message.content == prefix) {
        justprefix = true;
    }
    //this will print out rip
    if (command === `${prefix}rip`) {
        // Create the attachment using Attachment
        const attachment = new Attachment('https://i.imgur.com/w3duR07.png');
        // Send the attachment in the message channel
        message.channel.send(attachment);
    }
    if (command === `${prefix}rules`) {
        message.author.send(rulesembed);
    }
    // This will run if !avatar is entered 
    if (command === `${prefix}avatar`) {
        // This will check to see if you have a avatar and run if you do
        if (message.author.avatarURL === null) {
            //This will send That you do not have a avatar
            message.reply("Sorry you do not have a avatar please set one");
        }
        else {
            // This will send the avatar to your channel
            message.reply(`This is your avatar ${message.author.avatarURL}`);
        }
    }
    //This will Give you a help embed
    if (command === `${prefix}help`) {
        let helpmessage = new Discord.RichEmbed()
            .setAuthor("Help")
            .addField("!userinfo", `Will display your name ${message.author.username}`)
            .addField("!staff", `Will Start A Thread`)
            .addField("!rip", "will display rip")
            .addField("!avatar", "Will display avatar")
            .addField("!catfact", "Will display Fish fact")
            .addField("!dogfact", "Will display Cat fact")
            .setTimestamp();
        message.author.send(helpmessage);
    }
      // this will delete 100
    	if (command === `${prefix}purge`) {
        //Deletes 100 messages
         async function purge() {
            //This will check to see if you have a Admin Or Owner and if you do it will run the code in the {}
             if (message.member.roles.find(r => r.name === "Pizza Admin") || message.member.roles.find(r => r.name === "Owner")) {
            //This gets all the messages in the channel
            const fetched = await message.channel.fetchMessages({limit: 100});
            message.channel.bulkDelete(fetched);
     
        }
      }
      //This runs the function Purge()
        purge();
    }

    //This Will Ban users
// if the message content starts with "!ban"
  if (message.content.startsWith(`${prefix}ban`)) {
      //This will check if They have the rank Admin Or Owner
      if (message.member.roles.find(r => r.name === "Pizza Admin") || message.member.roles.find(r => r.name === "Owner")) {


    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Ban the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         * Read more about what ban options there are over at
         * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
         */
        member.ban({
          reason: `${message.author.username} Banned ${user.tag}`,
        }).then(() => {
          // We let the message author know we were able to ban the person
          message.reply(`Successfully banned ${user.tag}`);
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to ban the member,
          // either due to missing permissions or role hierarchy
          message.reply('I was unable to ban the member');
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        message.reply('That user isn\'t in this guild!');
      }
    } else {
    // Otherwise, if no user was mentioned
      message.reply('You didn\'t mention the user to ban!');
    }
}
    }

    // If the message content starts with "!kick"
    if (message.content.startsWith('!kick')) {
        // Assuming we mention someone in the message, this will return the user
        // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
        const user = message.mentions.users.first();
        // If we have a user mentioned
        if (user) {
            // Now we get the member from the user
            const member = message.guild.member(user);
            // If the member is in the guild
            if (member) {
                /**
                 * Kick the member
                 * Make sure you run this on a member, not a user!
                 * There are big differences between a user and a member
                 */
                member
                    .kick('Optional reason that will display in the audit logs')
                    .then(() => {
                        // We let the message author know we were able to kick the person
                        message.reply(`Successfully kicked ${user.tag}`);
                    })
                    .catch(err => {
                        // An error happened
                        // This is generally due to the bot not being able to kick the member,
                        // either due to missing permissions or role hierarchy
                        message.reply('I was unable to kick the member');
                        // Log the error
                        console.error(err);
                    });
            } else {
                // The mentioned user isn't in this guild
                message.reply("That user isn't in this guild!");
            }
            // Otherwise, if no user was mentioned
        } else {
            message.reply("You didn't mention the user to kick!");
        }
    }

    if(command === `${prefix}remove` && num === undefined) {
        message.delete();
        if (message.member.roles.find(r => r.name === "Pizza Admin") || message.member.roles.find(r => r.name === "Owner")) {

            message.channel.send("Please Add a number after !remove ");
        }
    }
    	if (command === `${prefix}remove` && num !== undefined) {
        async function clear() {
            if (message.member.roles.find(r => r.name === "Pizza Admin") || message.member.roles.find(r => r.name === "Owner")) { 
            message.delete();
            const fetched = await message.channel.fetchMessages({limit: num});
            message.channel.bulkDelete(fetched);
            authoravatar = message.author.avatarURL;
            const remove = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setAuthor(` ${message.author.username}`, `${authoravatar}`)
            .setTitle(`✅ Successfully removed ${num} messages.`)
            message.channel.send(remove);
        }
    }

    clear();
    }

    /*if(command === `${prefix}translate`) {
      //if (tran === germanword) {
        const translateembed = new Discord.RichEmbed()
      .setColor('#0099ff')
      .setTitle('Thread Created')
      .setDescription('Our Staff Team Will Get Back To You As Soon As Possible')
      .setTimestamp()
      .setFooter('To Close Thread Push The Lock Button', 'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1024px-Flag_of_Germany.svg.png');
      message.channel.send(translateembed);
      //}
    }*/

    if(command === `${prefix}dogfact`) {
		let i = randomInt(0, 10);
    const dogembed = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle('Dog Fact')
    .setDescription(list.catfact[i])
    .setTimestamp()
    .setFooter('Generator Made By ShadowGunn', 'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1024px-Flag_of_Germany.svg.png');
  message.channel.send(dogembed);
    }
    if (command === `${prefix}tyler`) {
        let i = randomInt(0, 2);
        const tylerembed = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTitle('Dog Fact')
            .setDescription(list.tyler[i])
            .setTimestamp()
            .setFooter('Generator Made By ShadowGunn', 'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1024px-Flag_of_Germany.svg.png');
        message.channel.send(tylerembed);
    }
    if(command ===`${prefix}catfact`) {
   	let i = randomInt(0, 12);
    const catembed = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle('Cat Fact')
    .setDescription(list.dogfact[i])
    .setTimestamp()
    .setFooter('Generator Made By ShadowGunn', 'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1024px-Flag_of_Germany.svg.png');
  message.channel.send(catembed);
    }
    if(command === `${prefix}cow`){
    	message.delete();
    	message.channel.send("https://giphy.com/gifs/dojacat-doja-cat-mooo-RJhasN5Konz6an51Vs");
    }
    if(command === `${prefix}plan`) {
    	const planEmbed = new Discord.RichEmbed()
		.setColor('#0099ff')
		.setTitle("Plan's For Upcoming Updates")
		.setDescription('Plans')
		.addField("Planning on adding !suggest" , "More Coming soon")
		.setTimestamp();
		message.channel.send(planEmbed);
    }


	if(command === `${prefix}staff`) {
		message.react('✅');
		bot.channels.get("641442259417563138").send(message.author + " Started A Thread And Needs Help @here");
message.author.send(helpEmbed).then(async (msg) => {
	msg.react('🔒')
  // Create a collector to listen for button presses
  const collector = msg.createReactionCollector((reaction, user) => user !== bot.user);

  // Every time a button is pressed, run this function.
  collector.on('collect', async (messageReaction) => {
    // If the x button is pressed, remove the message.
    if (messageReaction.emoji.name === '🔒') {
      message.author.send(noEmbed);
      bot.channels.get("641442259417563138").send(message.author + " Closed There Thread and does not need help @here");
      collector.stop(); // Delete the collector.
      return;
    }
});
});
    }
    if (justprefix != false) {
        message.channel.send("That is not a valid Command Please Do !help for a list of commands");
        return;
    }

});

bot.login(botSettings.token);