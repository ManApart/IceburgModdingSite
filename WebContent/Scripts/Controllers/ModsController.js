var modsCtrl;
(function(){
	var app = angular.module('akMods', []);

	app.directive("modsDir", function(){
		return {
			restrict: "E",
			templateUrl: "Mods.html"				
		};		
	});	
	
	app.controller('modsController', function($scope){
		modsCtrl = this;
		$scope.stats = createModStats();
		$scope.mods = createModData($scope);
		$scope.stats = createModStats();
		
		this.getStats = function(){
			return $scope.stats;
		}
		
		this.updateAsync = function(){
			$scope.$applyAsync();
		}
		replayModStats();
	});
	
})();

function replayModStats(){
	//first remove and re-add the labels, which re-triggers their animations
	var labels = $('#modStatOverlays');
	var newone = labels.clone(true);
	labels.before(newone);
	labels.remove();
	
	console.log("replay");
	
	var colors = ["#3a6297","#5c9df2","#e78800","#53e700","#bf00e7","#06d8e7","#ff95ee","#710e0c"];
	var data = modsCtrl.getStats().numbers;
	var canvas = document.getElementById("modChart");
	animatePieChartIn(canvas,data, colors, 0);
}


function createModStats(){
	var stats = {
		"names" :[
			"Alternate Actors",
			"Placeable Statics - Move Anything",
			"Buyable Paintings and Pictures - Place Anywhere",
			"The Gray Cowl of Nocturnal - Fully Functional Gray Fox Cowl",
			"Boethiah for Good Guys",
			"Namira for Good Guys",
			"Achievements Unlocked Legendary Edition",
			"A Friend of Time",
			"Painting in Skyrim",
			"Clothe Dead  NPCs",
			"Iceburgs Spiderman Suit",
			"FTL Homeworld -Savegame Manager",
			"Mines and Mills -Buy Iron Ingots and Firewood",
			"Daedric Light Armor - Daedric Blue",
			"Tamriel in Minecraft",
			"Better Underwear -  No Loincloth",
			"Skyrim Modesty Mod",
			"Legend of Zelda Hover Boots",
			"Midas Magic Spell Sorter",
			"Daedric Blue Weapons",
			"Multiple Nightingale Armors",
			"Elder Scrolls Music",
			"Royal Nordic",
			"The Black Star Renamed Azuras Black Star",
			"Salvation - Resurrect The Dead",
			"More Modest Tavern Girls",
			"The Quest of Thyme",
			"A Friend of Time - Short Story"
		 ],
		 "numbers" :[
			127953,
			88240,
			26707,
			24551,
			22489,
			11976,
			11407,
			11265,
			10146,
			9713,
			7799,
			7468,
			5787,
			4316,
			4129,
			2917,
			2683,
			2454,
			2329,
			1809,
			1773,
			1732,
			1241,
			1174,
			752,
			682,
			491,
			378
		],
		"index" : -1
	};
	return stats;
}

function createModData($scope){
	var projects = [{
		"title": "Placeable Statics",
		"picture": "PlaceableStatics.png",
		"description" : "Ever felt like you should be able to redecorate your house, any way you want? Shouldn't you be able to move chairs or beds, and then be able to use them where you put them? " +
				"Grab, move, store, buy, place, rotate and nudge nearly any furniture and static! Perfect to organize your Hearthfire home or Dawnguard Castles!"
	}, {
		"title": "Alternate Actors",
		"picture": "AlternateActors.png",
		"description" : "Play as any actor or creature! <a href='https://www.youtube.com/watch?v=8ZyAQcEfrHQ' target='_blank'> Trailer/Walkthrough</a>"
	}, {
		"title": "Royal Nordic",
		"picture": "RoyalNordic.png",
		"description" : "Explore a small new dungeon, then loot or craft your own Royal Nordic Armor. Or just use it as a texture replacer."
	}, {
		"title": "Elder Scrolls Music",
		"picture": "Music.png",
		"description" : "Incorporates the Morrowind and Oblivion OSTs into Skyrim. Does not replace music, but adds to the Skyrim OST."
	}, {
		"title": "Achievements Unlocked",
		"picture": "AchievementsUnlocked.gif",
		"description" : "Unlock every achievement through an MCM menu or by reading a book. Customize what achievements you unlock, or update the achievements you obtained while playing in offline mode. Legendary Edition includes all DLC."
	}, {
		"title": "Salvation - Resurrect the Dead",
		"picture": "Salvation.png",
		"description" : "Want to bring your fallen allies back to life in a way that is somewhat more balanced and immersive than using the console?" +
				"<br/>Salvation: Resurrect The Dead adds a master level resurrection spell that raises the dead."
	}, {
		"title": "A Friend of Time",
		"picture": "FriendOfTime.png",
		"description" : "Stop time, don the cowl of the Gray Fox, earn a glacial mansion, speak the language of the Dovah, and race across Skyrim as you befriend Aetas, the Daedric Lord of Time."
	}, {
		"title": "Boethiah for Good Guys",
		"picture": "Boethiah.png",
		"description" : "Complete Boethiah's quest without betraying a friend."
	}, {
		"title": "Namira for Good Guys",
		"picture": "Namira.png",
		"description" : "Play a trick on Namira! Complete Namira's quest 'The Taste of Death' without sacrificing a priest to Cannibals."
	}, {
		"title": "Iceburgs Spiderman Suit ",
		"picture": "SpidermanSuit.png",
		"description" : "This mod adds a Spiderman costume to a 'Cobwebbed Closet' on the upper floor of the Radiant Raiment in Solitude."
	}, {
		"title": "Buyable Paintings and Pictures",
		"picture": "BuyablePaintings.png",
		"description" : "Craft frames, buy paintings, and then hang them anywhere you want! Over 100 paintings that you can move at any time makes it easy to decorate everything from your house to your enemy's dungeon dwelling!"
	}, {
		"title": "Painting in Skyrim",
		"picture": "Painting.png",
		"description" : "Make Paintings, Decorate your Home with Art, Make Custom Paintings, study paintings for temporary buffs, and MORE!"
	}, {
		"title": "Tamriel in Minecraft",
		"picture": "Minecraft.jpg",
		"description" : "The world of Tamriel (from the Elder Scrolls) in Minecraft"
	}, {
		"title": "Gray Cowl of Nocturnal",
		"picture": "GrayCowl.png",
		"description" : "Do you have what it takes to don the fabled Gray Cowl of Nocturnal? This mod sets you on a short, clever quest to prove you're worthy of the great cowl. Complete it to earn a completely functional, better than the original cowl of the Gray Fox."
	}, {
		"title": "Zelda Hover Boots",
		"picture": "Zelda.png",
		"description" : "Use the fabled Hover Boots for The Legend of Zelda: Ocarina of Time"
	}, {
		"title": "Trading Cards in Skyrim",
		"picture": "TradingCards.png",
		"description" : "Complete your collection of 30 trading cards and view them in game."
	}, {
		"title": "Mines and Mills",
		"picture": "MinesAndMills.jpg",
		"description" : "Running out of iron ingots for Hearthfire? Running low on firewood and paper for Buyable Paintings and pictures? Mines and Mills solves these problems in a lore-friendly way: Friendly mines and mills sell their wares!"
	}, {
		"title": "Multiple Nightingale Armors",
		"picture": "MultipleNightingale.jpg",
		"description" : "Love Nightingale armor and love texture replaces, but don't want to use just one at a time? This mod lets you use up to 4 Nightingale armor retextures at the same time!"
	}, {
		"title": "Skyrim Modesty Mod",
		"picture": "Modesty.png",
		"description" : "This mod edits 30 meshes to make Skyrim a more modest country. Unlike other modesty mods that simply replace immodest armors with modest ones, this mod tweaks each armor so that you can enjoy a more modest Skyrim, while maintaining all of its original diversity."
	}, {
		"title": "Clothe Dead NPCs",
		"picture": "ClotheTheDead.png",
		"description" : "Dead NPCs now equip the clothing, armor, ammo, and weapons that you place in their inventories."
	}, {
		"title": "Azuras Black Star",
		"picture": "Azura.jpg",
		"description" : "This mod renames 'The Black Star' as 'Azura's Black Star' so that you don't have to scroll all of the way down through your soul gems to recharge your weapon."
	}, {
		"title": "Blue Daedric Weapons",
		"picture": "BlueWeapons.jpg",
		"description" : "Blue Daedric weapon re-texture and glow replacer. I made this with the Gimp to accompany my Daedric Blue Light Armor / texture replacer, and may also use it in my mod 'A Friend of Time'."
	}, {
		"title": "Daedric Light Armor",
		"picture": "BlueDaedric.jpg",
		"description" : "Craftable Light Daedric Armor, and/or a Blue Daedric armor texture and glow replacer. I made this with the Gimp and Skyedit and will be using it in my mod 'A Friend of Time'."
	}, {
		"title": "Better Underwear",
		"picture": "BetterUnderwear.png",
		"description" : "Replaces the vanilla loincloth with the vanilla speedo underwear."
	}, {
		"title": "Midas Spell Sorter for Oblivion",
		"picture": "SpellSorter.jpg",
		"description" : "Love the 290+ spells that Midas added to the game, but tired of having to scroll through them all the time? This mod lets you sort your spells by Midas, Non-Midas, Three Favorites lists, and by every spell school."
	}, {
		"title": "Skyrim Title Screen for Oblivion",
		"picture": "SkyrimStartScreen.jpg",
		"description" : "This mod replaces the vanilla loading symbol, title, title music, and title background with equivalents gleaned from previews of the upcoming Elder Scrolls game Skyrim."
	}, {
		"title": "Quest for Thyme",
		"picture": "QuestForThyme.jpg",
		"description" : "My first mod for Oblivion " +
				"<br/>What would you do if you could stop time?" +
				"<br/>The Quest of Thyme is a sequel to the Thieves Guild. The Daedric Lord of time asks the Gray Fox to find seven stolen items. The quest focus around an item that effects the fabric of time itself."
    }];
	//append file path to pics
	for (var i = 0; i < projects.length; ++i) {
			projects[i].picture = "Images/Mods/" + projects[i].picture;
	}
	return projects;
}