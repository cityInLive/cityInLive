import { Module } from './Module';
import { PanelComponent } from '../panel.component';

export class Tweet {

	public constructor(
		public name:      string,
		public tweetName: string,
		public picture:   string,
		public text:      string,
		public likes:     string,
		public retweets:  string,
		public date:      string,
		public userURL:   string,
		public tweetURL:  string) {
			this.name = "<a href='" + userURL +  "' target='_blank'>" + "@" + name + "</a>";
			this.date = "<a href='" + tweetURL + "' target='_blank'>" +    date    + "</a>";
		}

	}

	export class Twitter extends Module {

		public MODULE_NAME = 'twitter';

		public tweets: Tweet[];

		public get(panel: PanelComponent) {
			let o = this;
			this.requestFromPos(this.MODULE_NAME, panel.lat, panel.lng, function(data: any) {
				o.tweets = [];

				/**
				o.tweets.push(new Tweet(
					"djflo972",
					"dj flo",
					"https://pbs.twimg.com/profile_images/1780416530/n750925874_1689554_6982646_normal.jpg",
					"🌹PHENOMENAL #hashtag KOMPAAAA DJ FLO let’s go @valentinp72 !!!🌹 https://t.co/MNDY5smgev",
					"0", "0", "18 Janv.",
					"https://twitter.com/valentinp72",
					"https://google.com/"));*/



				for(let tweet of data.tweets.slice(0, 6)) {
					o.tweets.push(new Tweet(
						tweet.name,
						tweet.tweetname,
						tweet.picture,
						tweet.text,
						tweet.like,
						tweet.retweet,
						tweet.date + ' ' + tweet.time,
						tweet.url_user,
						tweet.url_tweet));
					console.log(tweet);
				}
				//console.log(data);
			});
		}

	}
