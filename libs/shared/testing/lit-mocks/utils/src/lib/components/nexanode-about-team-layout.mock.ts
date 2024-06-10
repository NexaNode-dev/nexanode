class MockNexaNodeAboutTeamLayout extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div>Mock NexaNodeAboutTeamLayout Component</div>`;
  }
}

customElements.define(
  'nexanode-about-team-layout',
  MockNexaNodeAboutTeamLayout,
);
