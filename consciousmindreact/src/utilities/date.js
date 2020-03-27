// Create Sequence of Numbers as String
function range(start, end) {
  return Array(end - start + 1).fill().map((_, idx) => (start + idx).toString())
}

export let DAYS = range(1,31);

DAYS.forEach(
  function(el, index) {

      // Add 0 to beginning if 1 digit
      const modifiedStr = el.length === 1 ? el = '0' + el : el;
      
      // replace the value in Array
      this[index] = modifiedStr;
  
    }, DAYS
);

export let MONTHS = new Map();
// months are indexed from 0
MONTHS.set(0, 'January');
MONTHS.set(1, 'February');
MONTHS.set(2, 'March');
MONTHS.set(3, 'April');
MONTHS.set(4, 'May');
MONTHS.set(5, 'June');
MONTHS.set(6, 'July');
MONTHS.set(7, 'August');
MONTHS.set(8, 'September');
MONTHS.set(9, 'October');
MONTHS.set(10, 'November');
MONTHS.set(11, 'December');

export let YEARS = range(1940, 2019).reverse();

