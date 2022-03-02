const _ = require('lodash');
class TokenModel {
	mergeTailDatabaseData(tailDatabaseData) {
		this.tailDatabaseData = tailDatabaseData;
		if (tailDatabaseData) {
			this.importedFromTailDatabaseOn = new Date();
			this.dataIsCleanForTailDatabase = tailDatabaseData.code?.length > 0;
			this.symbol = tailDatabaseData.code;
			this.logoUrl = tailDatabaseData.logo_url;
			this.description = tailDatabaseData.description;
			this.amountIssued = tailDatabaseData.supply;
			this.chiaLisp = tailDatabaseData.chialisp;
			this.clvm = tailDatabaseData.clvm;
		}
	}

	mergeXchTokenData(xchTokenData) {
		this.xchTokenData = xchTokenData;
		if (xchTokenData) {
			this.importedFromXchTokenOn = new Date();
			this.dataIsCleanForXchToken = xchTokenData.Symbol?.length > 0;
			this.symbol = xchTokenData.Symbol || this.symbol;
			this.logoUrl = xchTokenData.TailLogoUrl || xchTokenData.ImageUrl || this.logoUrl;
			this.description = xchTokenData.TailDatabaseDescription || this.description;
			this.amountIssued = typeof xchTokenData.Amount == 'number' ? xchTokenData.Amount / 1000 : _.toNumber(xchTokenData.Amount);
			this.issuedOn = xchTokenData.CreateTime ? new Date(_.toNumber(xchTokenData.CreateTime) * 1000) : this.issuedOn;
			this.issuedHeight = xchTokenData.Height;
			this.discordUrl = xchTokenData.Discord?.startsWith('http') ? xchTokenData.Discord : null;
			this.facebookUrl = xchTokenData.Facebook?.startsWith('http') ? xchTokenData.Facebook : null;
			this.redditUrl = xchTokenData.Reddit?.startsWith('http') ? xchTokenData.Reddit : null;
			this.telegramUrl = xchTokenData.Telegram?.startsWith('http') ? xchTokenData.Telegram : null;
			this.twitterUrl = xchTokenData.Twitter?.startsWith('http') ? xchTokenData.Twitter : null;
			this.websiteUrl = xchTokenData.Website?.startsWith('http') ? xchTokenData.Website : null;
		}
	}
	mergeSpacescanData(spacescanData) {
		this.spacescanData = spacescanData;
		if (spacescanData) {
			this.importedFromSpacescanOn = new Date();
			this.dataIsCleanForSpacescan = spacescanData.symbol?.length > 0;
			this.symbol = spacescanData.symbol || this.symbol;
			this.logoUrl = spacescanData.logo && spacescanData.logo != 'https://images.spacescan.io/xch/cat/default_logo.png' ? spacescanData.logo : this.logoUrl;
			this.description = spacescanData.description || this.description;
			this.amountIssued = spacescanData.total_supply || this.amountIssued;
			this.issuedOn = spacescanData.issued_time || this.issuedOn;
			this.chiaLisp = spacescanData.lisp || this.chiaLisp;
			this.clvm = spacescanData.clvm || this.clvm;
			this.priceUsd = spacescanData.price_usd;
			this.priceXch = spacescanData.price_xch;
			this.updatedOn = spacescanData.updated;
			this.holders = spacescanData.holders;
			this.tags = spacescanData.tags;
			this.transactionCount = spacescanData.txns_count;
			this.transactionAmount = spacescanData.txns_amount;
		}
	}
	get DisplayName() {
		return `${this.Name} (${this.Symbol})`;
	}
	get Name() {
		return this.spacescanData?.asset_name || this.xchTokenData?.Name || this.tailDatabaseData?.name;
	}
	get Tail() {
		return this.spacescanData?.asset_id || this.xchTokenData?.ASSET_ID || this.tailDatabaseData?.hash;
	}
	get Symbol() {
		return this.symbol;
	}
	get LogoUrl() {
		return this.logoUrl;
	}
	get Description() {
		return this.description;
	}
	get AmountIssued() {
		return this.amountIssued;
	}
	get ChiaLisp() {
		return this.chiaLisp;
	}
	get Clvm() {
		return this.clvm;
	}
	get IssuedOn() {
		return this.issuedOn;
	}
	get IssuedHeight() {
		return this.issuedHeight;
	}
	get DiscordUrl() {
		return this.discordUrl;
	}
	get FacebookUrl() {
		return this.facebookUrl;
	}
	get RedditUrl() {
		return this.redditUrl;
	}
	get TelegramUrl() {
		return this.telegramUrl;
	}
	get TwitterUrl() {
		return this.twitterUrl;
	}
	get WebsiteUrl() {
		return this.websiteUrl;
	}
	get PriceUsd() {
		return this.priceUsd;
	}
	get PriceXch() {
		return this.priceXch;
	}
	get UpdatedOn() {
		return this.updatedOn;
	}
	get Holders() {
		return this.holders;
	}
	get Tags() {
		return this.tags;
	}
	get TransactionCount() {
		return this.transactionCount;
	}
	get TransactionAmount() {
		return this.transactionAmount;
	}
	get ApisMissingDetails() {
		const apisMissingDetails = new Array();
		if (!this.dataIsCleanForTailDatabase) apisMissingDetails.push('taildatabase');
		if (!this.dataIsCleanForXchToken) apisMissingDetails.push('xchtoken');
		if (!this.dataIsCleanForSpacescan) apisMissingDetails.push('spacescan');
		return apisMissingDetails;
	}
}
module.exports.TokenModel = TokenModel;