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


const getelement = (rows, cols) => {
	var array = new Array(rows);
	for (let i = 0; i < cols; i++) {
		array[i] = new Array(cols);
	}
	return array;
}

function getmatrix() {
	var mymatrix = getelement(3, 4);
	mymatrix[0][0] = document.getElementById('a1').value;
	mymatrix[0][1] = document.getElementById('a2').value;
	mymatrix[0][2] = document.getElementById('a3').value;
	mymatrix[0][3] = document.getElementById('x1').value;
	mymatrix[1][0] = document.getElementById('b1').value;
	mymatrix[1][1] = document.getElementById('b2').value;
	mymatrix[1][2] = document.getElementById('b3').value;
	mymatrix[1][3] = document.getElementById('x2').value;
	mymatrix[2][0] = document.getElementById('c1').value;
	mymatrix[2][1] = document.getElementById('c2').value;
	mymatrix[2][2] = document.getElementById('c3').value;
	mymatrix[2][3] = document.getElementById('x3').value;
	return mymatrix;
}


function gauss() {

	var a = getmatrix();
	var augMat = a;

	var m21 = augMat[1][0] / augMat[0][0];
	var m31 = augMat[2][0] / augMat[0][0];

	for (i = 0; i < 4; i++) {
		augMat[1][i] -= m21 * augMat[0][i];
		augMat[2][i] -= m31 * augMat[0][i];
	}
	document.getElementById('outdiv').innerHTML += '<p style="font-size:120%; font-weight:bold;"> m21 =  ' + m21 + '<br> R2 - (m21)R1 --> R2 </p>';
	printMatrix(augMat, 3, 4);

	var m32 = augMat[2][1] / augMat[1][1];
	for (i = 0; i < 4; i++) {
		augMat[2][i] -= m32 * augMat[1][i];
	}
	document.getElementById('outdiv').innerHTML += '<br> <p style="font-size:120%; font-weight:bold;"> m32 =  ' + m32 + '<br> R3 - (m22)R2 --> R3 </p>';
	printMatrix(augMat, 3, 4);

	var x3 = augMat[2][3] / augMat[2][2];
	var x2 = (augMat[1][3] - (augMat[1][2] * x3)) / augMat[1][1];
	var x1 = (augMat[0][3] - (augMat[0][2] * x3) - (augMat[0][1] * x2)) / augMat[0][0];
	document.getElementById('resdiv').innerHTML += '<p style="font-size:120%; font-weight:bold;" > X1 = ' + x1 + "<br> X2 = " + x2 + "<br> X3 = " + x3 + "</p>";

}



function printMatrix(matrix, rows, cols) {

	var out = '<table class="augtab">';
	for (var i = 0; i < rows; i++) {
		out += "<tr>";
		for (var j = 0; j < cols; j++) {
			if ((cols == 4) && (j == cols - 1)) {
				out += "<td style='border: 1px solid #555555; border-top-color: transparent; border-bottom-color: transparent; border-right-color: transparent;'>" + matrix[i][j]; + "</td>";
			}
			else {
				out += "<td>" + matrix[i][j]; + "</td>";
			}
		}
		out += "</tr>";
	}
	document.getElementById('outdiv').innerHTML += out + "</table>" + "<br>";

}

function clrans() {
	document.getElementById('resdiv').innerHTML = '';
	document.getElementById('outdiv').innerHTML = '';
}











function LU() {

	var X = getmatrix();
	var augMat = X;

	var b = [augMat[0][3], augMat[1][3], augMat[2][3]];

	var m21 = augMat[1][0] / augMat[0][0];
	var m31 = augMat[2][0] / augMat[0][0];

	for (i = 0; i < 4; i++) {
		augMat[1][i] -= m21 * augMat[0][i];
		augMat[2][i] -= m31 * augMat[0][i];
	}

	var m32 = augMat[2][1] / augMat[1][1];
	for (i = 0; i < 4; i++) {
		augMat[2][i] -= m32 * augMat[1][i];
	}


	var x3 = augMat[2][3] / augMat[2][2];
	var x2 = (augMat[1][3] - (augMat[1][2] * x3)) / augMat[1][1];
	var x1 = (augMat[0][3] - (augMat[0][2] * x3) - (augMat[0][1] * x2)) / augMat[0][0];


	var U = getelement(3, 4);
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			U[i][j] = augMat[i][j];
		}
	}


	U[1][0] = U[2][0] = U[2][1] = 0;
	var L = getelement(3, 4);
	L = [
		[1, 0, 0, 0],
		[m21, 1, 0, 0],
		[m31, m32, 1, 0]
	];

	document.getElementById('outdiv').innerHTML += '<b>L = </b> <br>'; printMatrix(L, 3, 3);
	
	document.getElementById('outdiv').innerHTML += '<b>U = </b> <br>'; printMatrix(U, 3, 3);


	var C = [[augMat[0][3]], [augMat[1][3]], [augMat[2][3]]];
	/*
	var C = new Array(3); // creates an array with 3 undefined elements
	C[0] = b[0] / L[0][0]; 
	C[1] = (b[1] - (L[1][0] * C[0])) / L[1][1]; 
	C[2] = (b[2] - (L[2][0] * C[0]) - (L[2][1] * C[1])) / L[2][2];
	*/
	x3 = C[2] / U[2][2];
	x2 = (C[1] - (U[1][2] * x3)) / U[1][1];
	x1 = (C[0] - (U[0][1] * x2) - (U[0][2] * x3)) / U[0][0];
	document.getElementById('outdiv').innerHTML += '<b>C = </b> <br>'; printMatrix(C, 3, 1);
	//var results = document.getElementById('augmat').getElementById('foot')[0];
	document.getElementById('resdiv').innerHTML += '<p style="font-size:120%; font-weight:bold;" > X1 = ' + x1 + "<br> X2 = " + x2 + "<br> X3 = " + x3 + "</p>";

}




















