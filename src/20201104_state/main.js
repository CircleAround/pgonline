class StopWatch {
  setup (view) {
    this.statuses = {
      running: new RunningStatus(this),
      stop: new StopStatus(this),
      pause: new PauseStatus(this)
    }
    this.state = this.statuses.stop
    this.view = view
    this.reset()
  }

  clickedMainButton() {
    this.state.clickedMainButton()
  }

  clickedSubButton() {
    this.state.clickedSubButton()
  }

  run() {
    this.state = this.statuses.running
    this.nortify('run')
    this.timer = setInterval(() => {
      this.count++;
      this.nortify('countUp')
    }, 100);
  }

  lap() {
    this.currentLap = this.count - this.lastLap;
    this.lastLap = this.count;
    this.nortify('lap')
  }

  pause() {
    clearInterval(this.timer);
    this.state = this.statuses.pause
    this.nortify('pause')
  }

  reset() {
    this.count = 0
    this.lastLap = 0
    this.currentLap = 0
    this.state = this.statuses.stop
    this.nortify('reset')
  }

  nortify(event) {
    this.view.update(event)
  }
}

class StopStatus {
  constructor(app) {
    this.app = app
  }

  clickedMainButton() {
    this.app.run()
  }

  clickedSubButton() { }
}

class RunningStatus {
  constructor(app) {
    this.app = app
  }

  clickedMainButton() {
    this.app.pause()
  }

  clickedSubButton() {
    this.app.lap()
  }
}

class PauseStatus {
  constructor(app) {
    this.app = app
  }

  clickedMainButton() {
    this.app.run()
  }

  clickedSubButton() {
    this.app.reset()
  }
}

class StopWatchView {
  constructor(el) {
    this.$el = $(el);
    this.app = new StopWatch();
    this.app.setup(this)
    this.$('.buttons button.main').click( event => {
      this.app.clickedMainButton();
    });
    this.$('.buttons button.sub').click( event => {
      this.app.clickedSubButton();
    });
  }

  $(options) {
    return this.$el.find(options);
  }

  run() {
    this.decorateStopButton('main');
    this.decorateLapButton('sub');
  }

  countUp() {
    this.$('.display').text(this.app.count);
  }

  lap() {
    $(`<li>${this.app.currentLap}</li>`).prependTo(this.$('.laps'));
  }

  pause() {
    this.decorateRunButton('main');
    this.decorateResetButton('sub');
  }

  reset() {
    this.updateDisplay();
    this.clearLaps();
    this.decorateRunButton('main');
    this.decorateDisabledLapButton('sub')
  }

  getButton(name) {
    return this.$(`.buttons button.${name}`);
  }

  decorateRunButton(name) {
    this.getButton(name).text('run').removeAttr('disabled');
  }

  decorateStopButton(name) {
    this.getButton(name).text('stop').removeAttr('disabled');
  }

  decorateResetButton(name) {
    this.getButton(name).text('reset').removeAttr('disabled');
  }

  decorateLapButton(name) {
    this.getButton(name).text('lap').removeAttr('disabled');
  }

  decorateDisabledLapButton(name) {
    this.getButton(name).text('lap').attr('disabled', true);
  }

  updateDisplay() {
    this.$('.display').text(this.app.count);
  }

  clearLaps() {
    this.$('.laps').empty();
  }

  update(event) {
    this[event]()
  }
}

$(function () {  
  new StopWatchView($('.stopwatch'))
});
