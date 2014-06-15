//Hitung chi square
        function computeChiSqr(a,b,c,d){
            var n = a+b+c+d;
            var chi = (n*(Math.pow((Math.abs((a*d)-(b*c))-(n/2)),2)))/((a+b)*(c+d)*(a+c)*(b+d));

            return format(chi,4);
        }

        function computeNormal(a,b,c,d){
            var n = a+b+c+d;
            var p = (a+b)/n;
            var n1 = a+c;
            var n2 = b+d;

            var T = ((a/n1)-(b/n2))/Math.sqrt(p*(1-p)*((1/n1)+(1/n2)));
            return T;
        }

        Math.median = function() {
            var ary, numA, i;
            ary = Array.prototype.slice.call(arguments);
            for (i = ary.length-1; i >= 0; i--) {if (ary[i] !== +ary[i]) ary[i] = Number.NEGATIVE_INFINITY;}
            numA = function(a, b){return (a-b);};
            ary.sort(numA);
            while (ary.length > 1 && !isFinite(ary[0])) ary.shift();
            return ary[Math.floor(ary.length/2)];
            }


        //Dari textarea ambildata
        function arrayA(){
            var lines = $('#links').val().split(/\n/);
            var texts = [];
            for (var i=0; i < lines.length; i++) {
                if (/\S/.test(lines[i])) {
                    texts.push($.trim(lines[i]));
                }
        
            }
            return texts;
        }
        
        function arrayB(){
            var lines = $('#links2').val().split(/\n/);
            var texts = [];
            for (var i=0; i < lines.length; i++) {
                if (/\S/.test(lines[i])) {
                    texts.push($.trim(lines[i]));
                }
            }
            return texts;
        }
        
//Hit median gabungan
        function median(values) {
            values.sort( function(a,b) {return a - b;} );
            var half = Math.floor(values.length/2);
            if(values.length % 2)
                return values[half];
            else
                return (values[half-1] + values[half]) / 2.0;
        }
        
        function kurangDari(myArray, median){
            var count=0;
            for(var i=0; i < myArray.length; i++) {
                if(myArray[i] < median) {
                    count++;
                }
            }
            return count;
        }
        
        function lebihDari(myArray, median){
            var count=0;
            for(var i=0; i < myArray.length; i++) {
                if(myArray[i] > median) {
                    count=count+1;
                }
            }
            return count;
        }


        function oneOne(myArray, one){
            var count = 0;
            for(var i =0; i<myArray.length; i++){
                if(myArray[i] === one){
                    count++;
                }
            }
            return count;
        }

        function zeroOne(myArray, one){
            var count = 0;
            for(var i =0; i<myArray.length; i++){
                if(myArray[i] !== one){
                    count++;
                }
            }
            return count;
        }
        
       