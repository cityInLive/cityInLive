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

		public async get(panel: PanelComponent) {
			let o = this;
			this.requestFromPos(this.MODULE_NAME, panel.lat, panel.lng, function(data: any) {
				o.tweets = [];
				//console.log(data);
				for(let tweet of data.tweets) {
					o.tweets.push(new Tweet(
						tweet.name,
						tweet.tweetname,
						tweet.picture,
						tweet.text,
						tweet.like,
						tweet.retweet,
						tweet.date + ' ' + tweet.time.replace(/:\d\d$/, ''),
						tweet.url_user,
						tweet.url_tweet));
				}
			});
		}

	}
