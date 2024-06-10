class MockNexaNodeServicesListOneLayout extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div>MockNexaNodeServicesListOneLayout</div>`;
  }
}

customElements.define(
  'nexanode-services-list-one-layout',
  MockNexaNodeServicesListOneLayout,
);