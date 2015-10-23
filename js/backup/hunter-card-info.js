var CardInfo = function(json) {
	this.name = json.name;
	this.title = json.title;
	this.company = json.company;
	this.city = json.city;
	this.phone = json.phone;
	this.mail = json.mail;
	this.template = json.template;
}

CardInfo.prototype.tohtmlsimple = function() {
	if (!this.template) {
		this.template = getDefaultTemplate();
	}
	return this.template.replace("${name}", this.name).replace("${title}",
			this.title).replace("${company}", this.company).replace("${city}",
			this.city).replace("${phone}", this.phone).replace("${mail}",
			this.mail)
}

CardInfo.prototype.getDefaultTemplate = function() {
	return "";
}