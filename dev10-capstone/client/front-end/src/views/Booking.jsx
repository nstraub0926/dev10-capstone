import { useState } from 'react';
import { Calendar } from 'primereact/calendar';

function Booking() {

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (e) => {
        setSelectedDate(e.value);
    }

    return (
        <section className="section">
        <div className='p-calendar card flex justify-center'>
            <Calendar
                inline
                value={selectedDate}
                onChange={handleDateChange}
                style={{ width: '300px', height: '300px' }}
            />
            <div>
                Selected Date: {selectedDate && selectedDate.toDateString()}
            </div>
        </div>
        </section>
    );
}

export default Booking;