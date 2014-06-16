
			$(document).ready(function(){
			    $('#header ul li').click(function() {
			        $(this).siblings('li').removeClass('cbp-vicurrent');
			        $(this).addClass('cbp-vicurrent');
			    });
			});

	        var data = [
	            [21,23],
	            [30,21],
	            [12,45],
	            [13,44],
	            [21,23],
	            [30,21],
	            [12,45],
	            [13,44],
	            [21,23],
	            [30,21],
	            [12,45],
	            [13,44],
	            [21,23],
	            [30,21],
	            [12,45],
	            [" "," "],
	            [" "," "]
	        ];    

	      var $container = $("#dataTable");
	        $container.handsontable({
	        data: data,
	        startRows: 16,
	        startCols: 2,
	        minSpareRows: 1,
	        colWidths: [200, 190], 
	        rowHeaders: true,
	        colHeaders: true,
	      });

	        

	         function compute(form){
	          
	            var hot = $container.handsontable('getInstance');
	            var dataA = hot.getDataAtCol(0);
	             dataA=dataA.filter(function(e){return e});
	            var dataB = hot.getDataAtCol(1);
	             dataB=dataB.filter(function(e){return e});
	            var dataGab = dataA.concat(dataB);
	            var med = Math.median.apply(Math,dataGab);
	            
	            var a;
	            var b;
	            var c;
	            var d;
	            var grtMed;
	            var lsMed;
	            
	            if(isNaN(dataA[0])){
	                a = oneOne(dataA, dataA[0]);
	                b = oneOne(dataB, dataA[0]);
	                c = zeroOne(dataA, dataA[0]);
	                d = zeroOne(dataB, dataA[0]);
	                grtMed = dataA[0];
	                lsMed = "!"+dataA[0];
	                med = "-";
	            } if (!isNaN(dataA[0])){
	                a = lebihDari(dataA, med);
	                b = lebihDari(dataB, med);
	                c = kurangDari(dataA, med);
	                d = kurangDari(dataB, med);
	                grtMed = "&gt; Median";
	                lsMed = "&lt; Median";
	            }


	                
	                document.getElementById("grtMed").innerHTML=grtMed;
	                document.getElementById("grtMed1").innerHTML=grtMed;
	                document.getElementById("lsMed").innerHTML=lsMed;
	                document.getElementById("lsMed1").innerHTML=lsMed;
		            document.getElementById("med").innerHTML=med;
		            document.getElementById("med1").innerHTML=med;
	     

		            $(function() {
        // Create the chart
		        chart = new Highcharts.Chart({
		            chart: {
		                renderTo: 'containerChart',
		                type: 'pie'
		            },
		            title: {
		                text: 'Group A'
		            },
		            yAxis: {
		                title: {
		                    text: 'Total percent'
		                }
		            },
		            plotOptions: {
		                pie: {
		                    shadow: false
		                }
		            },
		            credits:{
		            	enabled:false
		            },
		            tooltip: {
		                formatter: function() {
		                    return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
		                }
		            },
		            series: [{
		                name: 'A',
		                data: [[grtMed,a],[lsMed,c]],
		                size: '100%',
		                innerSize: '50%',
		                showInLegend:true,
		                dataLabels: {
		                    enabled: false
		                }
		            }]
		        });
		    });   

$(function() {
        // Create the chart
		        chart = new Highcharts.Chart({
		            chart: {
		                renderTo: 'containerChart1',
		                type: 'pie'
		            },
		            title: {
		                text: 'Group B'
		            },
		            yAxis: {
		                title: {
		                    text: 'Total percent'
		                }
		            },
		            plotOptions: {
		                pie: {
		                    shadow: false
		                }
		            },
		            credits:{
		            	enabled:false
		            },
		            tooltip: {
		                formatter: function() {
		                    return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
		                }
		            },
		            series: [{
		                name: 'B',
		                data: [[grtMed,b],[lsMed,d]],
		                size: '100%',
		                innerSize: '50%',
		                showInLegend:true,
		                dataLabels: {
		                    enabled: false
		                }
		            }]
		        });
		    });   


	            if (document.getElementById('normal').checked) {
	            	var te = computeNormal(a,b,c,d);
	            	var z = calc_q(form);

	            	if(te >= z || te <= (z*(-1))){
		                document.getElementById("conclusionNormal").innerHTML="Tolak H0";
		            }else{
		                document.getElementById("conclusionNormal").innerHTML="Gagal Tolak H0";
		            }
		            document.getElementById("a1").innerHTML=a;
		            document.getElementById("b1").innerHTML=b;
		            document.getElementById("c1").innerHTML=c;
		            document.getElementById("d1").innerHTML=d;

					var ab = a+b;
		            var cd = c+d;
		            var ac = a+c;
		            var bd = b+d;
		            var n =a+b+c+d;
		            document.getElementById("ab1").innerHTML=ab;
		            document.getElementById("cd1").innerHTML=cd;
		            document.getElementById("ac1").innerHTML=ac;
		            document.getElementById("bd1").innerHTML=bd;
		            document.getElementById("abcd1").innerHTML=n;
		            
		            document.getElementById("zTbl").innerHTML=z;
		            document.getElementById("t").innerHTML=te;
		            window.location.hash = "hasilNormal";
        		}
        		else{
		            var chiSqr = computeChiSqr(a,b,c,d);
		            
		            var chiinv = chisqcalc(form);
		            
		            if(chiSqr >= chiinv){
		                document.getElementById("conclusion").innerHTML="Tolak H0";
		            }if (chiSqr < chiinv){
		                document.getElementById("conclusion").innerHTML="Gagal Tolak H0";
		            }
			        document.getElementById("a").innerHTML=a;
		            document.getElementById("b").innerHTML=b;
		            document.getElementById("c").innerHTML=c;
		            document.getElementById("d").innerHTML=d;
		            var ab = a+b;
		            var cd = c+d;
		            var ac = a+c;
		            var bd = b+d;
		            var n =a+b+c+d;
		            document.getElementById("ab").innerHTML=ab;
		            document.getElementById("cd").innerHTML=cd;
		            document.getElementById("ac").innerHTML=ac;
		            document.getElementById("bd").innerHTML=bd;
		            document.getElementById("abcd").innerHTML=n;
		            
		            document.getElementById("chiSqrTbl").innerHTML=chiinv;
		            document.getElementById("chiSqr").innerHTML=chiSqr;
		            window.location.hash = "hasil";       			
        		}


	        }
