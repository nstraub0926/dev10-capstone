import "../css/event-card.css";

function convertDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString( "en-US", { timeZone: "UTC" } );
}

function convertTime(time) {
    time = time.split(':');
    var hours = Number(time[0]);
    var minutes = Number(time[1]);

    var timeValue;

    if (hours > 0 && hours <= 12) {
    timeValue= "" + hours;
    } else if (hours > 12) {
    timeValue= "" + (hours - 12);
    } else if (hours == 0) {
    timeValue= "12";
    }
    
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
    timeValue += (hours >= 12) ? " P.M" : " A.M";

    return timeValue;
}

export default function RsvpCard({ item }) {
    console.log(item);
    return (
        <section className="section">
            <div className="container">
                <div className="columns">
                    <div className="column">
                        <div className="card is-horizontal shadow-md is-cursor-pointer transform is-duration-500 hover-shadow-xl hover-translate-y is-showdow-2xl is-shadow-none">
                            <div className="card-content p-0 is-flex is-flex-direction-column">
                                <div className="content p-5 has-text-grey-light">
                                    <h3>{item.title || item.facility}</h3>
                                <p className="is-size-6 has-text-weight-normal">{item.description}</p>
                                </div>
                                <div className="content p-5 has-background-success-light">
                                    <div className="columns">
                                        <div className="column">
                                            <div className="is-size-6">
                                                <span className="has-text-weight-semibold">{item.startDate ? convertDate(item.startDate) : convertDate(item.date)} {item.endDate !==  item.startDate ? " - " + convertDate(item.endDate) : null}</span>
                                            </div>
                                            <div className="is-size-6">
                                                <span className="has-text-primary-dark">{convertTime(item.startTime)} - {convertTime(item.endTime)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}