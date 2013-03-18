jQuery(document).ready(function() {
	jQuery('.star-item').click(function(evt){
		evt.preventDefault();
		var obj			= jQuery(this);
		var item 		= jQuery(this).closest('article');
		var id			= item.attr('pf-post-id');
		var parent		= jQuery(this).parent();
		var otherstar;
		if (parent.hasClass('modal-btns')){
			otherstar = item.find('header .star-item');
		} else {
			otherstar = item.find('.modal .star-item');
		}

		jQuery.post(ajaxurl, {
				action: 'pf_ajax_star',
				//We'll feed it the ID so it can cache in a transient with the ID and find to retrieve later.			
				post_id: id
		}, 
		function(response) {
			var read_content = jQuery(response).find("response_data").text();
			if (read_content != false){
				//alert(otherstar);
				dostarstuff(obj, item, id, parent, otherstar);
			} else {
				alert('PressForward was unable to access the relationships database.');
			}
		});		

		
	});
	
	function dostarstuff(obj, item, id, parent, otherstar){
		if (jQuery(obj).hasClass('btn-warning')){
		
			jQuery(obj).removeClass('btn-warning');
			jQuery(obj).html('<i class="icon-star"></i> Star');
			otherstar.removeClass('btn-warning');
			otherstar.html('<i class="icon-star"></i> Star');		
		} else {
			

			jQuery(obj).addClass('btn-warning');
			jQuery(obj).html('<i class="icon-star"></i> Starred');
			otherstar.addClass('btn-warning');
			otherstar.html('<i class="icon-star"></i> Starred');
		}
	}
	
	jQuery('.pf_container').on('click', '.schema-actor', function(evt){
		evt.preventDefault();
		var obj			= jQuery(this);
		var schema		= obj.attr('pf-schema');
		var item 		= jQuery(this).closest('article');
		var id			= item.attr('pf-post-id');
		var parent		= jQuery(this).parent();
		var otherschema;
		var schemaclass;
		if (parent.hasClass('modal-btns')){
			otherschema = item.find('#'+id+' [pf-schema="'+schema+'"]');
		} else {
			otherschema = item.find('#'+id+' .modal-btns [pf-schema="'+schema+'"]');
		}
		
		if(obj.is('[pf-schema-class]')){
			schemaclass = obj.attr('pf-schema-class');
		} else {
			schemaclass = false;
		}

		jQuery.post(ajaxurl, {
				action: 'pf_ajax_relate',
				//We'll feed it the ID so it can cache in a transient with the ID and find to retrieve later.			
				post_id: id,
				schema: schema
		}, 
		function(response) {
			var read_content = jQuery(response).find("response_data").text();
			if (read_content != false){
				//alert(otherschema.attr('id'));
				doschemastuff(obj, item, id, parent, otherschema, schemaclass);
			} else {
				alert('PressForward was unable to access the relationships database.');
			}
		});		

		
	});

	
	function doschemastuff(obj, item, id, parent, otherschema, schemaclass){
		if (jQuery(obj).hasClass('schema-active')){
			jQuery(obj).removeClass('schema-active');
			otherschema.removeClass('schema-active');		
		} else {
			jQuery(obj).addClass('schema-active');
			otherschema.addClass('schema-active');
		}
		
		if (schemaclass != false){

			if (jQuery(obj).hasClass(schemaclass)){
			
				jQuery(obj).removeClass(schemaclass);
				otherschema.removeClass(schemaclass);		
			} else {
				jQuery(obj).addClass(schemaclass);
				otherschema.addClass(schemaclass);
			}		
		
		}
		
	}	
	
});