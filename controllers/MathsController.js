import { handleStaticResourceRequest } from '../staticResourcesServer.js';
import Controller from './Controller.js';
import { factorial, isPrime, findPrime, Addition, soustraction, multiplication, division, modulo,validateInputs } from '../mathUtilities.js';

export default class MathsController extends Controller {
    constructor(HttpContext) {
        super(HttpContext);
    }
    async getMath() {
        // init instance variable
        let nbOp = Object.keys(this.HttpContext.path.params).length;
        let data = this.HttpContext.path.params;
        let x = data.x != null ? Number(data.x) : null;
        let y = data.y != null ? Number(data.y) : null;
        let n = data.n != null ? Number(data.n) : null;

        //valide request if not valide return bad request responce
        let validationError = validateInputs(data, x, y, n,nbOp);
        if (validationError) 
              return this.HttpContext.response.badRequest(validationError);

        if (this.HttpContext.path.queryString === '?') {
            this.HttpContext.req.url = './Maths/annexe.html';
           return handleStaticResourceRequest(this.HttpContext); 
        }
        switch (data.op) {
            case ' ':
                data.value = Addition(x, y).toString();
                break;
            case '-':
                data.value = soustraction(x, y).toString();
                break;
            case '*':
                data.value = multiplication(x, y).toString();
                break;
            case '/':
                data.value = division(x, y).toString();
                break;
            case '%':
                data.value = modulo(x, y).toString();
                break;
            case '!':
                    data.value = factorial(n).toString();
                break;
            case 'p':
                    data.value = isPrime(n);
                break;
            case 'np':
                    data.value = findPrime(n).toString();
                break;
            default:
                return this.HttpContext.response.badRequest('op parameter missing');
        }
        this.HttpContext.response.JSON(data);
    }

    
    
}
