import { Module } from './Module';
import { PanelComponent } from '../panel.component';

export class Picture {

	public constructor(
		public imageURL: string,
		public likes:    number,
		public reblogs:  number,
		public link:     string
	) {

	}

}

export class Instagram extends Module {

	public MODULE_NAME = 'instagram';

	public pictures: Picture[];

	public async get(panel: PanelComponent) {
		let o = this;

		o.pictures = [];
		
		o.pictures.push(new Picture('https://scontent-ort2-1.cdninstagram.com/vp/3f66e53ab029ebae4c82fb48a9b9e9d7/5B6EE0EC/t51.2885-15/e35/29417952_597665567264489_3048429497343803392_n.jpg', 102, 28, 'https://www.instagram.com/p/BhPw-bUlxj9/'));
		o.pictures.push(new Picture('https://scontent-ort2-1.cdninstagram.com/vp/8e3e2ee4e2a03d6a5386c5ba298a4c29/5B5776A8/t51.2885-15/e35/29715965_615562695457243_3361528318254907392_n.jpg', 0, 0, 'https://www.instagram.com/p/BhUi8tAgJ-W/'));
		o.pictures.push(new Picture('https://scontent-ort2-1.cdninstagram.com/vp/3f66e53ab029ebae4c82fb48a9b9e9d7/5B6EE0EC/t51.2885-15/e35/29417952_597665567264489_3048429497343803392_n.jpg', 102, 28, 'https://www.instagram.com/p/BhPw-bUlxj9/'));
		o.pictures.push(new Picture('https://scontent-ort2-1.cdninstagram.com/vp/8e3e2ee4e2a03d6a5386c5ba298a4c29/5B5776A8/t51.2885-15/e35/29715965_615562695457243_3361528318254907392_n.jpg', 0, 0, 'https://www.instagram.com/p/BhUi8tAgJ-W/'));
		o.pictures.push(new Picture('https://scontent-ort2-1.cdninstagram.com/vp/3f66e53ab029ebae4c82fb48a9b9e9d7/5B6EE0EC/t51.2885-15/e35/29417952_597665567264489_3048429497343803392_n.jpg', 102, 28, 'https://www.instagram.com/p/BhPw-bUlxj9/'));
		o.pictures.push(new Picture('https://scontent-ort2-1.cdninstagram.com/vp/8e3e2ee4e2a03d6a5386c5ba298a4c29/5B5776A8/t51.2885-15/e35/29715965_615562695457243_3361528318254907392_n.jpg', 0, 0, 'https://www.instagram.com/p/BhUi8tAgJ-W/'));
		o.pictures.push(new Picture('https://scontent-ort2-1.cdninstagram.com/vp/3f66e53ab029ebae4c82fb48a9b9e9d7/5B6EE0EC/t51.2885-15/e35/29417952_597665567264489_3048429497343803392_n.jpg', 102, 28, 'https://www.instagram.com/p/BhPw-bUlxj9/'));
		o.pictures.push(new Picture('https://scontent-ort2-1.cdninstagram.com/vp/8e3e2ee4e2a03d6a5386c5ba298a4c29/5B5776A8/t51.2885-15/e35/29715965_615562695457243_3361528318254907392_n.jpg', 0, 0, 'https://www.instagram.com/p/BhUi8tAgJ-W/'));	o.pictures.push(new Picture('https://scontent-ort2-1.cdninstagram.com/vp/3f66e53ab029ebae4c82fb48a9b9e9d7/5B6EE0EC/t51.2885-15/e35/29417952_597665567264489_3048429497343803392_n.jpg', 102, 28, 'https://www.instagram.com/p/BhPw-bUlxj9/'));
		o.pictures.push(new Picture('https://scontent-ort2-1.cdninstagram.com/vp/8e3e2ee4e2a03d6a5386c5ba298a4c29/5B5776A8/t51.2885-15/e35/29715965_615562695457243_3361528318254907392_n.jpg', 0, 0, 'https://www.instagram.com/p/BhUi8tAgJ-W/'));

		/*
		this.requestFromPos(this.MODULE_NAME, panel.lat, panel.lng, function(data: any) {
			//o.pictures = [];




			for(let picture of data.images) {
				o.picture.push(new Picture(
					picture.imageURL,
					picture.likes,
					picture.reblogs,
					picture.link
					));
				}
			});
		});*/

	}
}
