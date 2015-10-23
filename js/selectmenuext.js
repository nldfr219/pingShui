(function($) {

	var methods = {
		init : function(options) {
			if ($(this).length > 0) {
				createMenu(options.data, options.id, "body", $(this));
				$(this).click(function() {
					document.location = "#" + options.id
				});
				$(this).attr("keymap", JSON.stringify(scanJson(options.data)));
				if((this).children(".selected-name").length == 0)
					$(this).append("<span class='selected-name'></span>");

				if ($(this).attr("selected_item") != undefined) {
					$(this).children(".selected-name").html(
							getSelectedName($(this).attr("keymap"), $(this)
									.attr("selected_item")));
				}
			}
		},
		val : function(value) {

		}
	};

	var scanJson = function(json, rtn) {
		if (rtn == undefined)
			rtn = {};
		for (var i = 0; i < json.length; i++) {
			var item = json[i];

			rtn[item.Id] = item.Name;
			if (item.Child)
				rtn = scanJson(item.Child, rtn);
		}
		return rtn;
	};

	var createMenu = function(json, menuid, target, root) {
		var div = $(target + " > #" + menuid);

		if (div.length > 0) {
			div.remove();
		}
		var html = "<div data-role='page' id='"
				+ menuid
				+ "'><div data-role='header'><h1>选择</h1><a data-icon='carat-l' class='ui-link ui-btn-left ui-btn ui-icon-carat-l ui-btn-icon-notext ui-shadow ui-corner-all' href='javascript:history.back()'></a></div></div>";
		$(target).append(html);
		div = $(target + " > #" + menuid);

		for (var i = 0; i < json.length; i++) {
			div.append(createItem(json[i], root));
		}

		$(target + " > #" + menuid + " .haschild")
				.click(
						function() {
							// alert($(this).attr("child"));
							createMenu(JSON.parse($(this).attr("child")),
									menuid + "-" + $(this).attr("id"), target,
									root);
							document.location = "#" + menuid + "-"
									+ $(this).attr("id");
						});

	};

	var createItem = function(item, root) {
		var id = item.Id;
		var name = item.Name;
		var children = item.Child;

		var selected_item = new Array();
		if (root.attr("selected_item") != undefined) {
			if(root.attr("selected_item") != "")
				selected_item = root.attr("selected_item").split(",");
		}

		if (children) {
			return $("<a id='" + id + "' class='ui-btn haschild' child='"
					+ JSON.stringify(children) + "'>" + name + "</a>");
		} else {
			var checked = "";
			if (selected_item.contains(id)) {
				checked = "checked=true";
			}
			var rtnlabel = "<label id='" + id + "'>" + name + "</label>";
			var rtninput = "<input type='checkbox' id='" + id + "' " + checked
					+ "/>";

			return $(rtnlabel).append(
				$(rtninput).change(
					function() {
						var selected_item = new Array();
						if (root.attr("selected_item") != undefined && root.attr("selected_item") != "") {
							selected_item = root.attr("selected_item")
									.split(",");
						}
						if ($(this).prop("checked")) {
							// alert(kv[$(this).attr("id")]);
							selected_item.push($(this).attr("id"));
						} else {
							selected_item.remove($(this).attr("id"));
						}
						root.attr("selected_item", selected_item
								.toIntStr());
						root.children(".selected-name").html(
								getSelectedName(root.attr("keymap"),
										selected_item));
					}
				)
			);
		}
	};

	var getSelectedName = function(keymap, keys) {
		var rtn = "";
		var keysp;
		if(keys instanceof Array) {
			keysp = keys;
		} else {
			keysp = keys.split(",");
		}
			var keymapjson = JSON.parse(keymap);
			for (var i = 0; i < keysp.length; i++) {
				if(keymapjson[keysp[i]] == undefined || keymapjson[keysp[i]] == "") continue;
				if (i != 0)
					rtn = rtn + ",";
				
				rtn += keymapjson[keysp[i]];
			}
		return rtn;
	}

	$.fn.selectmenuext = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(
					arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist');
		}
	};

})(jQuery);

Array.prototype.contains = function(element) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == element) {
			return true;
		}
	}
	return false;
};
Array.prototype.remove = function(b) {
	var a = this.indexOf(b);
	if (a >= 0) {
		this.splice(a, 1);
		return true;
	}
	return false;
};
Array.prototype.toIntStr = function(e) {
	var rtn = "";
	for (var i = 0; i < this.length; i++) {
		var com = ",";
		if (i == 0)
			com = "";
		rtn = rtn + com + this[i];
	}
	return rtn;
}