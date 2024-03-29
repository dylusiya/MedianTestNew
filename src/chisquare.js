//   MAIN FUNCTION
function chisqcalc(form) {
    dof=1;

// Calculate critical value

    tail_prob=eval(form.tail_prob.value)
    if ((tail_prob<0) || (tail_prob>1)) { alert("Tail probability must be between 0 and 1")
                    form.tail_prob.focus()
                    form.tail_prob.select()
                    return false;
                                        }
    if (tail_prob<1) {
        return format(critchi(1-tail_prob,dof),4)
    }
    if (tail_prob==1){ return "Inf";
    }
}



function format(value, decimal)
{
    wi = (value < 0) ? Math.ceil(value) : Math.floor(value)
    shift = Math.pow(10,decimal)
    wd = Math.round((Math.abs(value - wi)) * shift)
    if (wd == shift) {
       wi = wi + ((value < 0) ? -1 : 1)
       wd = 0
       tring = "" } else tring = wd
    decim = Math.pow(10, (decimal-1))
    for (var i = 2; (wd < decim) && (decim >= 1); i++)
            {
            decim = Math.pow(10, (decimal - i))
            tring = "0" + tring
            }
    if (value < 0 && value > -1 && wi == 0)
      return "-" + wi + "." + tring
    else
      return wi + "." + tring
}


    /*  The following JavaScript functions for calculating normal and
        chi-square probabilities and critical values were adapted by
        John Walker from C implementations
        written by Gary Perlman of Wang Institute, Tyngsboro, MA
        01879.  Both the original C code and this JavaScript edition
        are in the public domain.  */

    /*  POZ  --  probability of normal z value

        Adapted from a polynomial approximation in:
                Ibbetson D, Algorithm 209
                Collected Algorithms of the CACM 1963 p. 616
        Note:
                This routine has six digit accuracy, so it is only useful for absolute
                z values < 6.  For z values >= to 6.0, poz() returns 0.0.
    */

    function poz(z) {
        var y, x, w;
        var Z_MAX = 6.0;              /* Maximum meaningful z value */
        
        if (z == 0.0) {
            x = 0.0;
        } else {
            y = 0.5 * Math.abs(z);
            if (y >= (Z_MAX * 0.5)) {
                x = 1.0;
            } else if (y < 1.0) {
                w = y * y;
                x = ((((((((0.000124818987 * w
                         - 0.001075204047) * w + 0.005198775019) * w
                         - 0.019198292004) * w + 0.059054035642) * w
                         - 0.151968751364) * w + 0.319152932694) * w
                         - 0.531923007300) * w + 0.797884560593) * y * 2.0;
            } else {
                y -= 2.0;
                x = (((((((((((((-0.000045255659 * y
                               + 0.000152529290) * y - 0.000019538132) * y
                               - 0.000676904986) * y + 0.001390604284) * y
                               - 0.000794620820) * y - 0.002034254874) * y
                               + 0.006549791214) * y - 0.010557625006) * y
                               + 0.011630447319) * y - 0.009279453341) * y
                               + 0.005353579108) * y - 0.002141268741) * y
                               + 0.000535310849) * y + 0.999936657524;
            }
        }
        return z > 0.0 ? ((x + 1.0) * 0.5) : ((1.0 - x) * 0.5);
    }

 
    var BIGX = 20.0;                  /* max value to represent exp(x) */

    function ex(x) {
        return (x < -BIGX) ? 0.0 : Math.exp(x);
    }   

    /*  POCHISQ  --  probability of chi-square value

              Adapted from:
                      Hill, I. D. and Pike, M. C.  Algorithm 299
                      Collected Algorithms for the CACM 1967 p. 243
              Updated for rounding errors based on remark in
                      ACM TOMS June 1985, page 185
    */

    function pochisq(x, df) {
        var a, y, s;
        var e, c, z;
        var even;                     /* True if df is an even number */

        var LOG_SQRT_PI = 0.5723649429247000870717135; /* log(sqrt(pi)) */
        var I_SQRT_PI = 0.5641895835477562869480795;   /* 1 / sqrt(pi) */
        
        if (x <= 0.0 || df < 1) {
            return 1.0;
        }
        
        a = 0.5 * x;
        even = !(df & 1);
        if (df > 1) {
            y = ex(-a);
        }
        s = (even ? y : (2.0 * poz(-Math.sqrt(x))));
        if (df > 2) {
            x = 0.5 * (df - 1.0);
            z = (even ? 1.0 : 0.5);
            if (a > BIGX) {
                e = (even ? 0.0 : LOG_SQRT_PI);
                c = Math.log(a);
                while (z <= x) {
                    e = Math.log(z) + e;
                    s += ex(c * z - a - e);
                    z += 1.0;
                }
                return s;
            } else {
                e = (even ? 1.0 : (I_SQRT_PI / Math.sqrt(a)));
                c = 0.0;
                while (z <= x) {
                    e = e * (a / z);
                    c = c + e;
                    z += 1.0;
                }
                return c * y + s;
            }
        } else {
            return s;
        }
    }

    /*  CRITCHI  --  Compute critical chi-square value to
                     produce given p.  We just do a bisection
                     search for a value within CHI_EPSILON,
                     relying on the monotonicity of pochisq().  */

    function critchi(p, df) {
        var CHI_EPSILON = 0.000001;   /* Accuracy of critchi approximation */
        var CHI_MAX = 99999.0;        /* Maximum chi-square value */
        var minchisq = 0.0;
        var maxchisq = CHI_MAX;
        var chisqval;
        
        if (p <= 0.0) {
            return maxchisq;
        } else {
            if (p >= 1.0) {
                return 0.0;
            }
        }
        
        chisqval = df / Math.sqrt(p);    /* fair first value */
        while ((maxchisq - minchisq) > CHI_EPSILON) {
            if (pochisq(chisqval, df) < p) {
                maxchisq = chisqval;
            } else {
                minchisq = chisqval;
            }
            chisqval = (maxchisq + minchisq) * 0.5;
        }
        return chisqval;
    }