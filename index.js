'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Unofficial Amazon Facts';

/**
 * Array containing country facts.
 */
var FACTS = [
    "Amazon began in the garage of founder Jeff Bezos’ home in Washington State. The site was launched on July 16 1995.",
    "Amazon was originally named Cadabra, as in ‘Abracadabra’, but it was scrapped after several people misheard it as 'cadaver'.",
    "Other proposed names included MakeItSo.com (after Captain Picard's frequent command in Star Trek), Awake.com, Browse.com, Bookmall.com and Relentless.com. If you type relentless.com into a web browser it will redirect you to Amazon.",
    "In the end Bezos chose Amazon.com to suggest scale (Amazon.com launched with the tagline 'Earth's biggest book store') and because website listings at the time were alphabetical.",
    "Originally, the website only sold books. But because of a lack of space, Amazon had no inventory. When an order came in, they would find the book online, ship it to the Amazon office and then repackage it before sending on to the customer.",
    "The first book Amazon.com ever sold was Fluid Concepts & Creative Analogies: Computer Models of the Fundamental Mechanisms of Thought.",
    "Many of Amazon’s book distributors required them to order 10 books at a time. But in the early days they couldn’t afford to so every time they needed to fill a customer’s order they would order the one book they needed, and nine copies of an obscure book on lichens which was always out of stock.",
    "Three days after launch, Bezos got an email from Jerry Yang, one of the founders of Yahoo, asking if they’d like to be featured on Yahoo's What's Cool page. Bezos said yes, Yahoo put the site on the list, and orders sky rocketed.",
    "By the end of its first week, Amazon had took in over $12,000-worth (£7,969; $AU16,553) of orders.",
    "At launch, the site wasn't actually finished which resulted in a huge programming error that allowed sneaky customers to trick Amazon into sending them money. By ordering a negative quantity of books Amazon would credit the money to their bank card.",
    "During Amazon’s first month in business, it received orders from customers in 50 US states and 45 countries across the world.",
    "The office had a bell instaled that would ring every time someone made a purchase. Within a few weeks, sales were happening so frequently that they had to shut it off.",
    "In the early stages of Amazon, Jeff Bezos, his wife MacKenzie and Amazon’s first-ever employee Shel Kaphan held their meetings inside their local Barnes & Noble store.",
    "To keep overheads low the office desks were made from cheap doors, with sawed-off two-by-fours for legs. The company still reportedly hands out a Door Desk Award to employees who implement thrifty ideas.",
    "In the company’s first year, Bezos hired mobile billboards to drive by Barnes & Noble stores displaying the question 'Can't find that book you wanted?' along with Amazon's website address.",
    "In 1997, Barnes & Noble sued Amazon, alleging that 'Earth’s Largest Bookstore' was a false claim. They eventually settled out of court with Amazon continuing to use their slogan.",
    "In the early days of Amazon, Bezos got employees pick out the 20 strangest titles sold every week and awarded a prize for the weirdest. Some of the reported winners included Training Goldfish Using Dolphin Training Techniques and How To Start Your Own Country.",
    "Despite big sales and a healthy customer base it took almost seven years for Amazon to start making any real money. It was January 2002 before it reported its first profitable quarter, making a modest $5 million (£3.3 million; $AU6.9 million).",
    "Amazon employees, including CEO Bezos, spend two days every two years working at the customer service desk.",
    "Proving just how seriously he takes customer service, Bezos had Amazon’s packaging redesigned after an elderly customer complained. She said she loved ordering books from the site but had to wait for her nephew to come over and tear into the difficult-to-open packaging before she could read them.",
    "Amazon's users are five times more valuable than eBay's. Amazon's average customer brings in about $189 (£123; $AU260) every year while eBay's brings in just $39 (£25.90; $AU53).",
    "In 1998 the company was dramatically under-staffed for the Christmas holiday season rush. It’s reported that every employee had to take a graveyard shift in the fulfilment centers to meet demand with many bringing their friends and family in to help too.",
    "To ensure that doesn’t happen again, Amazon now hires a record amount of staff over the holiday season. This year it’s creating 100,000 seasonal positions across its US network of fulfilment and sorting centers and over 40,000 across its European Fulfillment Network.",
    "The festive period can be incredibly stressful for Amazon’s logistics team. In the early 2000s, Jeff Wilke, Amazon's operations manager, would let any person or team who accomplished a significant goal yell into the phone at him at the top of their lungs. He said some of the screams blew out his speakers.",
    "In 2012, Amazon’s site went down for 49 minutes. The company estimates it lost nearly $5.7 million (£3.79 million; $AU7.86 million) in sales as a result.",
    "Amazon counts the CIA as one of its customers, after it secured a $600 million (£398 million; $AU827 million) deal with the agency in 2013 for cloud computing storage, which is part of Amazon Web Services (AWS).",
    "Amazon’s fulfilment center in Phoenix, Arizona, is made up of 1.2 million square feet, which is the equivalent of 28 football fields. You can take an hour-long tour around it if you like.",
    "A building at Amazon's Seattle site is called Rufus, named after a Welsh corgi who was the pet of an employee. The dog liked to attend meetings and became something of a company mascot. There was also a superstition that Rufus had to tap his paw on the keyboard to launch a new feature on the website.",
    "Amazon has bought out several companies, including popular online shoe retailer Zappos for $1.2 billion (£800 million; $AU1.66 billion). The company’s portfolio also includes Audible, IMDB and Twitch. In 2013 Bezos purchased The Washington Post for $250 million (£165 million; $AU345 million).",
    "Some centers are so large that the ‘pick ambassadors’ – the employees that collect order items – can walk 10+ miles a day retrieving items. To help its warehouse workers, Amazon now uses robots to assist. The robots are made by Kiva Systems, a company Amazon bought in early 2014 for $775 million (£514 million; $AU1 billion).",
    "In an effort to reduce the number of unmotivated warehouse employees at its fulfilment centers, Amazon launched a Pay to Quit program in 2014. If a worker hands in their resignation, they’ll get $3,000 (£1992.25; $AU4138.42). By 2017, the amount is expected to be $5,000 (£3,320.42; $AU6,897.36). Less than 10% of the first wave of staffers offered the deal took them up on it.",
    "Today, Amazon has more than 90,000 full-time employees across its 50 fulfilment centers and 20 sorting centers in the US alone.",
    "Many of Amazon’s previous employees have gone to start their own multi-million dollar companies. These include Jason Kilar, who founded American online streaming service Hulu, and Charlie Cheever, who created question and answer site Quora.",
    "When the same-day Prime service was launched in Manhattan, New York, the company claims one customer got their item – an Easy-Bake Oven – in a record 23 minutes.",
    "When Amazon was developing the Kindle it was codenamed Fiona after a character in Neal Stephenson’s novel The Diamond Age.",
    "In late 2015 Amazon reported that it had more than 270 million active customer accounts worldwide, and was shipping to more than 75 countries.",
    "On Cyber Monday 2014, Amazon sold more than 300 items per second. Forbes estimates the company's net worth sits at $175.1 billion (£116.28 billion; $AU241.55 billion).",
    "Amazon's current logo was designed to depict a smile that goes from A to Z.",
    "From humble beginnings to worldwide success, Amazon’s founder and CEO Jeff Bezos is now worth $59.4 billion (£39.45 billion; $AU81.94 billion).",
    "Amazon's warehouses have more square footage than 700 Madison Square Gardens and could hold more water than 10,000 Olympic Pools.",
    "Amazon.com employees spend two days every two years working at the customer service desk, even the CEO. This practice is to help all workers understand the customer service process.",
    "Amazon owns 10 percent of North American E-Commerce. Office Depot, Stapes, Apple, Dell, WalMart, Sears, and Liberty all own another 10 percent of the market, the same size as Amazon. That leaves 1,000+ retailers to all fight for the remaining 80 percent.",
    "In 2012, when Amazon's site went down for 49 minutes the company missed sales of nearly $5.7 million.",
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random country fact from the country facts list
        var factIndex = Math.floor(Math.random() * FACTS.length);
        var randomFact = FACTS[factIndex];

        // Create speech output
        var speechOutput = "Here's your Amazon fact: " + randomFact + ". Would you like another fact about the e-commerce giant?";

        this.emit(':askWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say tell me an amazon fact, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Ok, bah-bye!!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Until next time, Goodbye!');
    }
};