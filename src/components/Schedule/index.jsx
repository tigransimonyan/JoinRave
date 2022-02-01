import './style.css';

function Schedule() {
  return (
    <div className="schedule">
      <h4 className="schedule-title">schedule</h4>
      <table className="schedule-table">
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
            <th>Sun</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>UTC 15:00</td>
            <td>Ambient</td>
            <td>Techno</td>
            <td>Techno</td>
            <td>Techno</td>
            <td>Techno</td>
            <td>Ambient</td>
            <td>Ambient</td>
          </tr>
          <tr>
            <td>UTC 17:00</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>UTC 19:00</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>UTC 21:00</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Schedule;
