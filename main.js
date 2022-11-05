jQuery.getJSON("./data.json", function (result) {
  var pdfData = "";

  var cartDataHotel = "";
  var clientData = "";
  result.map((data, index) => {
    const { cartData } = data;
    console.log(cartData.displayFacilities);
    var facilities = "";

    cartData.displayFacilities.forEach((element) => {
      facilities += "<li>" + element + "</li>";
    });

    cartDataHotel += `
      <tr >
        <td style="padding: 10px 0;border-bottom: 1px solid #333;"> ${index} </td>
        <td style="padding: 10px 0;border-bottom: 1px solid #333;"> ${data.cartData.propertyName} </td>
        <td style="padding: 10px 0;border-bottom: 1px solid #333;">${data.cartData.basePrice} USD</td>
      </tr>
    `;
    clientData += `
     
     
     `;
  });

  pdfData += `
            <table style="width: 100% ;    border-spacing: 0;">
              <tr>
                <th>Logo</th>
              </tr>
          </table>

   


          <table  style="width: 100% ;    border-spacing: 0;">
            <tr style="background: ">
              <th>Client Info</th>
              <th>Booking Info</th>
            </tr>
            <tr>
              <td>Name: [Name]</td>
              <td>Mobile [0123456789]</td>
            </tr>
            <tr>
              <td style="padding-bottom: 50px;">Booking Date: [date]</td>
              <td style="padding-bottom: 50px;">Tracking number [number]</td>
            </tr>
          </table>

          <table style="width: 100%; padding-top: 10px; border-spacing: 0;">
            <tr style="background: #1e6d8b;  border-radius: 30px;padding: 10px; padding: 10px;color: #fff;">
              <th style="border-radius: 30px 0 0 30px;padding: 10px;">QTA</th>
              <th>Hotel Name</th>
              <th style="border-radius: 0 30px 30px 0;"> Price per night</th>
            </tr style="padding-top: 20px;">
            ${cartDataHotel}
          </table>

          <table style="padding: 50px; width:100%">
            <tr style="text-align: center">
              <th>logo</th>
            </tr>
            <tr>
              <th>
                thankyou for your business if you hava queries please contact with us.
              </th>
            </tr> 
         </table>


          <table style="padding: 50px; width:100%">
            <tr style="text-align: left">
              <td style="text-align: left">
                <div class="title">Contact info</div>
                <div class="contact">
                  <div>Mobile: +25841894984<div/>
                  <div>Address:Rahman Ville<div/>
                </div>
              
              </td>
              <td style="text-align: left">
              <div class="title"> Terms of Use</div>
              </td>
            </tr>
         </table>
         
          <table style=" width:100%">
            <tr style="text-align: center">
              <th style="text-align: center">All rights reserved. Ghuddy 2022 </th>
              
            </tr>
         </table>
         
      `;

  $("#test").html(pdfData);
 
});


$("#btn").click(function () {
  function getPDF(){

		var HTML_Width = $("#test").width();
		var HTML_Height = $("#test").height();
		var top_left_margin = 15;
		var PDF_Width = HTML_Width+(top_left_margin*2);
		var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
		var canvas_image_width = HTML_Width;
		var canvas_image_height = HTML_Height;
		
		var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
		

		html2canvas($("#test")[0],{allowTaint:true}).then(function(canvas) {
			canvas.getContext('2d');
			
			console.log(canvas.height+"  "+canvas.width);
			
			
			var imgData = canvas.toDataURL("image/jpeg", 1.0);
			var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
		    pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
			
			
			for (var i = 1; i <= totalPDFPages; i++) { 
				pdf.addPage(PDF_Width, PDF_Height);
				pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
			}
			
		    pdf.save("HTML-Document.pdf");
        });
	};
  getPDF();
});

