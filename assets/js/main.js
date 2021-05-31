var iter = 0;
var error = 100;
var xr = 0;
var xp1 = 0;

const f = (x) => {
	var errormsg = document.getElementById('errormsg')
	var value = document.getElementById('hidden').innerText.toLowerCase();
	var scope = {
		x: x
	};
	var eqn = math.compile(value);
	var result = eqn.eval(scope);
	return result;
}

const clrtab = () => {
	document.getElementById('disp').getElementsByTagName('tbody')[0].innerHTML = '';
	var errormsg = document.getElementById('errormsg');
	errormsg.innerHTML = '';
}

const bisection = (xl, xu, eps) => {
	var maxiter = document.getElementById('maxiter');
	error = 100;
	if (error >= eps && iter < maxiter.value) {
		xold = xr
		xr = (xl + xu) / 2;
		error = Math.abs((xr - xold) / xr) * 100;
		output_bisection(iter, xl, f(xl), xu, f(xu), xr, f(xr), error);
		iter++;
		if (f(xr) * f(xl) > 0) xl = xr;
		else if (f(xr) * f(xl) < 0) xu = xr;
		return bisection(xl, xu, eps);
	} else {
		var root = document.getElementById('root');
		root.innerHTML = '<span style="color:green;font-weight:bold">' + parseFloat(xr).toPrecision(5) * 1 + '</span>';
		iter = 0;
		error = 100;
	}
}


const output_bisection = (iter, xl, fxl, xu, fxu, xr, fxr, error) => {
	var xlf = parseFloat(xl).toFixed(3) * 1;
	var xuf = parseFloat(xu).toFixed(3) * 1;
	var fxlf = parseFloat(f(xl)).toFixed(3) * 1;
	var fxuf = parseFloat(f(xu)).toFixed(3) * 1;
	var xrf = parseFloat(xr).toFixed(3) * 1;
	var fxrf = parseFloat(f(xr)).toFixed(3) * 1;
	var errorf = parseFloat(error).toFixed(3) * 1;
	var tbody = document.getElementById('disp').getElementsByTagName('tbody')[0];
	tbody.innerHTML = tbody.innerHTML + "<tr><th>" + iter + "</th><th>" + xlf + "</th><th>" + fxlf + "</th><th>" + xuf + "</th><th>"
		+ fxuf + "</th><th>" + xrf + "</th><th>" + fxrf + "</th><th>" + errorf + "</th></tr>";
}

function falsepos(xl, xu, eps) {
	var maxiter = document.getElementById('maxiter');
	if (error >= eps && iter < maxiter.value) {
		xold = xr
		xr = xu - ((f(xu) * (xl - xu)) / (f(xl) - f(xu)));
		error = Math.abs((xr - xold) / xr) * 100;
		output_falsepos(iter, xl, f(xl), xu, f(xu), xr, f(xr), error);
		iter++;
		if (f(xr) * f(xl) > 0) xl = xr;
		else if (f(xr) * f(xl) < 0) xu = xr;
		return falsepos(xl, xu, eps);
	} else {
		var root = document.getElementById('root');
		root.innerHTML = '<span style="color:green;font-weight:bold">' + parseFloat(xr).toPrecision(5) * 1 + '</span>';
		iter = 0;
		error = 100;
	}

}


function output_falsepos(iter, xl, fxl, xu, fxu, xr, fxr, error) {
	var xlf = parseFloat(xl).toFixed(3) * 1;
	var xuf = parseFloat(xu).toFixed(3) * 1;
	var fxlf = parseFloat(f(xl)).toFixed(3) * 1;
	var fxuf = parseFloat(f(xu)).toFixed(3) * 1;
	var xrf = parseFloat(xr).toFixed(3) * 1;
	var fxrf = parseFloat(f(xr)).toFixed(3) * 1;
	var errorf = parseFloat(error).toFixed(3) * 1;
	var tbody = document.getElementById('disp').getElementsByTagName('tbody')[0];
	tbody.innerHTML = tbody.innerHTML + "<tr><th>" + iter + "</th><th>" + xlf + "</th><th>" + fxlf + "</th><th>" + xuf + "</th><th>"
		+ fxuf + "</th><th>" + xrf + "</th><th>" + fxrf + "</th><th>" + errorf + "</th></tr>";
}

function fxp(x0, eps) {
	output_fxp(iter, x0, error, f(x0));
	var maxiter = document.getElementById('maxiter');
	if (error >= eps && iter < maxiter.value) {
		xold = x0;
		++iter;
		xr = f(xold)
		error = Math.abs((xr - xold) / xr) * 100;
		return fxp(f(x0), eps);
	} else {
		var root = document.getElementById('root');
		root.innerHTML = '<span style="color:green;font-weight:bold">' + parseFloat(x0).toPrecision(5) * 1 + '</span>';
		iter = 0;
		error = 100;
	}

}


function output_fxp(iter, x0, error, fxo) {
	var x0f = parseFloat(x0).toFixed(3) * 1;
	var errorf = parseFloat(error).toFixed(3) * 1;
	var fxof = parseFloat(fxo).toFixed(3) * 1;
	var tbody = document.getElementById('disp').getElementsByTagName('tbody')[0];
	tbody.innerHTML = tbody.innerHTML + "<tr><th>" + iter + "</th><th>" + x0f + "</th><th>" + fxof + "</th><th>" + errorf + " %</th></th>";
}

function newton(x0, eps) {
	var maxiter = document.getElementById('maxiter');
	xp1 = x0 - (f(x0) / fD(x0));
	output_newton(iter, x0, f(x0), fD(x0), xp1, error);
	++iter;
	if (error >= eps && iter < maxiter.value) {
		error = Math.abs((xp1 - x0) / xp1) * 100;
		newton(xp1, eps);
	} else {
		var root = document.getElementById('root');
		root.innerHTML = '<span style="color:green;font-weight:bold">' + parseFloat(x0).toPrecision(5) * 1 + '</span>';
		iter = 0;
		error = 100;
	}

}

function fD(xin) {
	var MQ = MathQuill.getInterface(2);
	var dervarea = document.getElementById('derv'); //define variable to point to empty span area to output derv

	var expr = document.getElementById('hidden').innerText.toLowerCase(); //Get input math from html

	const x = xin;
	var scope = {
		x: xin //solve for X, used by mathjs library
	};

	var eqn = math.compile(expr); //from Mathjs library  
	var derv = math.derivative(expr, 'x')

	dervarea.innerHTML = derv; //Output derivative in field
	MQ.StaticMath(dervarea);

	var result = derv.eval(scope);
	return result;
}

function output_newton(iter, x0, fx0, fdx0, xp1, error) {
	var x0f = parseFloat(x0).toFixed(3) * 1;
	var errorf = parseFloat(error).toFixed(3) * 1;
	var fxof = parseFloat(fx0).toFixed(3) * 1;
	var fdox = parseFloat(fdx0).toFixed(3) * 1;
	var xp1f = parseFloat(xp1).toFixed(3) * 1;
	var tbody = document.getElementById('disp').getElementsByTagName('tbody')[0];
	tbody.innerHTML = tbody.innerHTML + "<tr><th>" + iter + "</th><th>" + x0f + "</th><th>" + fxof + "</th><th>" + fdox + "</th><th>" + xp1f + "</th><th>" + errorf + " %</th></th>";
}




function seCant(xold, x0, eps) {
	var maxiter = document.getElementById('maxiter');
	output_seCant(iter, xold, f(xold), x0, f(x0), error);
	++iter;
	if (error >= eps && iter < maxiter.value) {
		xnew = x0 - ((f(x0) * (xold - x0)) / (f(xold) - f(x0)));
		xold = x0;
		error = Math.abs((xnew - xold) / xnew) * 100;

		seCant(xold, xnew, eps);
	} else {
		var root = document.getElementById('root');
		root.innerHTML = '<span style="color:green;font-weight:bold">' + parseFloat(x0).toPrecision(5) * 1 + '</span>';
		iter = 0;
		error = 100;
	}
}

function output_seCant(iter, xold, fxold, xnew, fxnew, error) {
	var xoldf = parseFloat(xold).toFixed(3) * 1;
	var fxoldf = parseFloat(fxold).toFixed(3) * 1;
	var xnewf = parseFloat(xnew).toFixed(3) * 1;
	var fxnewf = parseFloat(fxnew).toFixed(3) * 1;
	var errorf = parseFloat(error).toFixed(3) * 1;

	var tbody = document.getElementById('disp').getElementsByTagName('tbody')[0];
	tbody.innerHTML = tbody.innerHTML + "<tr><th>" + iter + "</th><th>" + xoldf + "</th><th>" + fxoldf + "</th><th>" + xnewf + "</th><th>" + fxnewf + "</th><th>" + errorf + " %</th></th>";
}