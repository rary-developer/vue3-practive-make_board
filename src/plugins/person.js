export default {
	install(app, options) {
		const person = {
			name: '김태희',
			say() {
				alert(this.name);
			},
			...options,
		};
		app.config.globalProperties.$person = person;
		app.provide('person', person);
	},
};
