var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SequencesSchema = Schema({
	_id: { type: String, required: true },
	seq: { type: Number, default: 0 }
});

var sequences = mongoose.model("sequences", SequencesSchema);

// __v를 없애고 싶으면 { versionKey : false } 를 추가
var UrlsSchema = new Schema({
	_id: { type: Number },
	url: String,
	created_at: { type: Date, default: Date.now }
});

UrlsSchema.pre("save", function(next) {
	var self = this;
	// `findOneAndUpdate` 조회 후 Update 하는 함수
	sequences.findOneAndUpdate(
		{ _id: "url_count" },
		{ $inc: { seq: 1 } },
		{ upsert: true },
		function(error, result) {
			if (error) {
				console.log('Error :', error, ', result :', result);
				return next(error);
			}
			else{
				console.log('result :', result);
			}
			self.created_at = new Date();
			self._id = result.seq;
			next();
		}
	);
});

var urls = mongoose.model("urls", UrlsSchema);

module.exports = urls;
