import webStorage from "../../src/store/webStorage";

describe('Test webStorage', () => {
	beforeEach(()=> webStorage.clear());
	it('Check general methods', ()=> {
		webStorage.set("foo", "bar");
		expect(webStorage.get("foo")).to.eq("bar");
		webStorage.set("foo", "baz");
		expect(webStorage.get("foo")).to.eq("baz");
		webStorage.set("bar", "foo");
		expect(webStorage.get("bar")).to.eq("foo");
		expect(webStorage.get("foo")).to.eq("baz");
		webStorage.remove("foo");
		expect(webStorage.get("foo")).to.be.null;
		const tagged = webStorage.tag('tagged');
		expect(webStorage.get('tagged')).to.eq(tagged);
		expect(webStorage.get('tagged')).is.a('String');
		expect(webStorage.get('tagged').length).to.be.greaterThan(20);
		webStorage.clear();
		expect(webStorage.get('tagged')).to.be.null;
		expect(webStorage.get("foo")).to.be.null;
		expect(webStorage.get("bar")).to.be.null;
	});

	it ('Can store weird stuff', ()=> {
		const weirdStuff = {
			nullVal: null,
			number : 91.1,
			object : {foo: 'foo', bar: { baz: 42 }}
		}
		for (const [key,value] of Object.entries(weirdStuff)) {
			webStorage.set(key, value);
			expect(webStorage.get(key)).to.deep.equal(value);
		}
		webStorage.set('aStringObject', new String('uhoh'));
		expect(webStorage.get('aStringObject')).to.equal('uhoh');
	});

});
