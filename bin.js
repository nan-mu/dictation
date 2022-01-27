"nodejs";
"ui";
var bin = {};
var confuse = require("confused.js");

let tv = id("tv_word").findOne().bounds();
w.setPosition(tv.centerX() - 300, tv.centerY() + 100);

const main_reader = function (mes) {
	sleep(1000);
	let q = id("tv_word").findOne().text();
	if (q == null) {
		console.log("can't find tv_word");
		mes("can't find tv_word");
		continue;
	}
	confuse.fyapi(q, (res, err) => {
		if (err) {
			console.error("出错，在翻译回调函数中");
			return;
		}
		let q_zh = res.body.json().trans_result[0].dst;
		let b_c_q = click(q_zh);
		mes(q + "意思的是" + q_zh);
		if (!b_c_q) {
			ui.run(function () {
				w.text.setText(q + "意思的是" + q_zh + "\n寻找选项失败，请手动点击");
			});
		}
		sleep(100);
		let b_click_xyt = click("下一题");
		if (!b_click_xyt) {
			sleep(5000);
		}
	});
	sleep(100);
}

module.exports = bin;