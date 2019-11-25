const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;
favemoji = null;
const bot = new Discord.Client();
const { Client, Attachment } = require('discord.js');
//This Is called with !staff and Starts a Thread
const helpEmbed = new Discord.RichEmbed()
.setColor('#0099ff')
.setTitle('Thread Created')
.setDescription('Our Staff Team Will Get Back To You As Soon As Possible')
.setTimestamp()
.setFooter('To Close Thread Push The Lock Button', 'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1024px-Flag_of_Germany.svg.png');
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
});
bot.on("message", async message => {
if (message.member.roles.find(r => r.name === "Mute")) {
	message.delete();
	message.author.send("Sorry You have been muted from chat")
}
if (message.member.roles.find(r => r.name === "Mute")) return;
	let messageArray = message.content.split(" ");
	let command = messageArray[0];
	args = messageArray.slice(1);
	let num = messageArray[1];
  if(command === "fat") {
    message.channel.send("Your going to be ban if you type that");  
    
  }



	if(!command.startsWith(prefix)) return;

	if(command === `${prefix}userinfo`) {
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

	if (command === `${prefix}rip`) {
        // Create the attachment using Attachment
        const attachment = new Attachment('https://i.imgur.com/w3duR07.png');
        // Send the attachment in the message channel
        message.channel.send(attachment);
    }

	if (command === `${prefix}avatar`) {
			message.reply('Getting your avatar ' + message.author)
    		message.reply(message.author.avatarURL);
    	}

	if(command === `${prefix}help`) {
		let helpmessage = new Discord.RichEmbed()
			.setAuthor("Help")
			.addField("!userinfo", `Will display your name ${message.author.username}`)
			.addField("!staff", `Will Start A Thread`)
			.addField("!rip", "will display rip")
			.addField("!avatar", "Will display avatar")
			.addField("!catfact", "Will display Fish fact")
			.addField("!dogfact", "Will display Cat fact")
			.setTimestamp();
		message.channel.send(helpmessage);
	}
    	if (command === `${prefix}purge`) {
        //Deletes 100 messages
         async function purge() {
            if (message.member.roles.find(r => r.name === "Admin") || message.member.roles.find(r => r.name === "Owner")) {
           	message.delete();
            const fetched = await message.channel.fetchMessages({limit: 100});
            message.channel.bulkDelete(fetched);
     
        }
      }
        purge();
    }

    //This Will Ban users
// if the message content starts with "!ban"
  if (message.content.startsWith('!ban')) {
    if (message.member.roles.find(r => r.name === "Admin") || msg.member.roles.find(r => r.name === "Owner")) {


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
          reason: 'They were bad!',
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

    if(command === `${prefix}remove` && num === undefined) {
      message.delete();
      message.channel.send("Please Add a number after !remove ");
    }
    	if (command === `${prefix}remove` && num !== undefined) {
        async function clear() {
        if (message.member.roles.find(r => r.name === "Admin") || message.member.roles.find(r => r.name === "Owner")) { 
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

    if(command === `${prefix}dogfact`) {
		let i = randomInt(0, 10);
    	message.channel.send(botSettings.Catfacts[i]);
    }
    if(command ===`${prefix}catfact`) {

   		let i = randomInt(0, 12);
   		message.channel.send(botSettings.dogfact[i])
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

});

bot.login(botSettings.token);