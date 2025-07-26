// Spa Services Data
const spaServices = [
    {
        id: 1,
        name: 'Swedish Massage',
        duration: 60,
        price: 150000,
        description: 'Relaxing full body massage to relieve stress and tension',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400'
    },
    {
        id: 2,
        name: 'Deep Tissue Massage',
        duration: 90,
        price: 200000,
        description: 'Therapeutic massage targeting deep muscle layers',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'
    },
    {
        id: 3,
        name: 'Facial Treatment',
        duration: 60,
        price: 120000,
        description: 'Rejuvenating facial for healthy, glowing skin',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400'
    },
    {
        id: 4,
        name: 'Body Scrub',
        duration: 45,
        price: 100000,
        description: 'Exfoliating treatment for smooth, soft skin',
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400'
    }
];

// Staff Data
const spaStaff = [
    {
        id: 1,
        name: 'Maya Sari',
        specialties: [1, 2], // Swedish & Deep Tissue
        photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300',
        bio: 'Certified massage therapist with 8 years experience'
    },
    {
        id: 2,
        name: 'Dewi Lestari',
        specialties: [3], // Facial
        photo: 'https://images.unsplash.com/photo-1594824388948-d11d57f83bb2?w=300',
        bio: 'Licensed esthetician specializing in facial treatments'
    },
    {
        id: 3,
        name: 'Sari Indah',
        specialties: [4], // Body Scrub
        photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300',
        bio: 'Body treatment specialist with holistic approach'
    }
];

// Mock booked slots (for demonstration)
const bookedSlots = [
    { date: '2025-07-28', time: '10:00', staff_id: 1 },
    { date: '2025-07-28', time: '14:00', staff_id: 2 },
    { date: '2025-07-29', time: '09:00', staff_id: 1 },
    { date: '2025-07-29', time: '16:00', staff_id: 3 }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderServices();
    renderBookingForm();
});

// Render services grid
function renderServices() {
    const servicesGrid = document.getElementById('services-grid');
    
    servicesGrid.innerHTML = spaServices.map(service => `
        <div class="col-md-6 col-lg-3 mb-4">
            <div class="card h-100 shadow-sm">
                <img src="${service.image}" class="card-img-top" alt="${service.name}" style="height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${service.name}</h5>
                    <p class="card-text">${service.description}</p>
                    <div class="mt-auto">
                        <p class="mb-1"><strong>Duration:</strong> ${service.duration} minutes</p>
                        <p class="mb-2"><strong>Price:</strong> Rp ${service.price.toLocaleString()}</p>
                        <button class="btn btn-primary" onclick="selectService(${service.id})">Select Service</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Render booking form
function renderBookingForm() {
    const bookingForm = document.getElementById('booking-form');
    
    bookingForm.innerHTML = `
        <div class="booking-steps">
            <div class="step" id="step-1">
                <h4 class="mb-4">Step 1: Choose Service</h4>
                <select class="form-select mb-3" id="service-select" onchange="updateServiceSelection()">
                    <option value="">Select a service...</option>
                    ${spaServices.map(service => `
                        <option value="${service.id}">${service.name} - ${service.duration}min - Rp ${service.price.toLocaleString()}</option>
                    `).join('')}
                </select>
                <div id="service-details" class="d-none mb-3"></div>
                <button class="btn btn-primary" onclick="nextStep(2)" id="next-step-1" disabled>Next: Choose Therapist</button>
            </div>
            
            <div class="step d-none" id="step-2">
                <h4 class="mb-4">Step 2: Choose Therapist</h4>
                <div id="staff-selection" class="mb-3"></div>
                <button class="btn btn-outline-secondary me-2" onclick="prevStep(1)">Previous</button>
                <button class="btn btn-primary" onclick="nextStep(3)" id="next-step-2" disabled>Next: Select Time</button>
            </div>
            
            <div class="step d-none" id="step-3">
                <h4 class="mb-4">Step 3: Select Date & Time</h4>
                <div class="row">
                    <div class="col-md-6">
                        <label class="form-label">Select Date</label>
                        <input type="date" class="form-control" id="booking-date" onchange="updateAvailableSlots()" min="${new Date().toISOString().split('T')[0]}">
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Available Time Slots</label>
                        <div id="time-slots" class="mt-2"></div>
                    </div>
                </div>
                <button class="btn btn-outline-secondary me-2 mt-3" onclick="prevStep(2)">Previous</button>
                <button class="btn btn-primary mt-3" onclick="nextStep(4)" id="next-step-3" disabled>Next: Contact Details</button>
            </div>
            
            <div class="step d-none" id="step-4">
                <h4 class="mb-4">Step 4: Contact Information</h4>
                <div class="row">
                    <div class="col-md-6">
                        <label class="form-label">Full Name</label>
                        <input type="text" class="form-control" id="customer-name" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Phone Number</label>
                        <input type="tel" class="form-control" id="customer-phone" required>
                    </div>
                </div>
                <div class="mt-3">
                    <label class="form-label">Email Address</label>
                    <input type="email" class="form-control" id="customer-email" required>
                </div>
                <div class="mt-3">
                    <label class="form-label">Special Requests (Optional)</label>
                    <textarea class="form-control" id="special-requests" rows="3"></textarea>
                </div>
                <button class="btn btn-outline-secondary me-2 mt-3" onclick="prevStep(3)">Previous</button>
                <button class="btn btn-success mt-3" onclick="confirmBooking()">Confirm Booking</button>
            </div>
            
            <div class="step d-none" id="step-5">
                <div class="text-center">
                    <i class="fas fa-check-circle text-success" style="font-size: 4rem;"></i>
                    <h4 class="mt-3 text-success">Booking Confirmed!</h4>
                    <div id="booking-summary" class="mt-3"></div>
                    <button class="btn btn-primary mt-3" onclick="newBooking()">Make Another Booking</button>
                </div>
            </div>
        </div>
    `;
}

// Booking form functions
let selectedService = null;
let selectedStaff = null;
let selectedDateTime = null;

function selectService(serviceId) {
    document.getElementById('service-select').value = serviceId;
    updateServiceSelection();
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

function updateServiceSelection() {
    const serviceId = parseInt(document.getElementById('service-select').value);
    const nextBtn = document.getElementById('next-step-1');
    
    if (serviceId) {
        selectedService = spaServices.find(s => s.id === serviceId);
        nextBtn.disabled = false;
        
        // Show service details
        const serviceDetails = document.getElementById('service-details');
        serviceDetails.className = 'alert alert-info';
        serviceDetails.innerHTML = `
            <strong>${selectedService.name}</strong><br>
            Duration: ${selectedService.duration} minutes<br>
            Price: Rp ${selectedService.price.toLocaleString()}
        `;
    } else {
        selectedService = null;
        nextBtn.disabled = true;
        document.getElementById('service-details').className = 'd-none';
    }
}

function nextStep(stepNumber) {
    // Hide current step
    document.querySelectorAll('.step').forEach(step => step.classList.add('d-none'));
    
    // Show target step
    document.getElementById(`step-${stepNumber}`).classList.remove('d-none');
    
    // Load step-specific content
    if (stepNumber === 2) {
        loadStaffSelection();
    } else if (stepNumber === 3) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('booking-date').min = today;
    }
}

function prevStep(stepNumber) {
    document.querySelectorAll('.step').forEach(step => step.classList.add('d-none'));
    document.getElementById(`step-${stepNumber}`).classList.remove('d-none');
}

function loadStaffSelection() {
    const staffSelection = document.getElementById('staff-selection');
    const availableStaff = spaStaff.filter(staff => 
        staff.specialties.includes(selectedService.id)
    );
    
    staffSelection.innerHTML = availableStaff.map(staff => `
        <div class="card mb-3" onclick="selectStaff(${staff.id})" style="cursor: pointer;">
            <div class="row g-0">
                <div class="col-md-3">
                    <img src="${staff.photo}" class="img-fluid rounded-start h-100" style="object-fit: cover;" alt="${staff.name}">
                </div>
                <div class="col-md-9">
                    <div class="card-body">
                        <h5 class="card-title">${staff.name}</h5>
                        <p class="card-text">${staff.bio}</p>
                        <button class="btn btn-outline-primary">Select ${staff.name}</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function selectStaff(staffId) {
    selectedStaff = spaStaff.find(s => s.id === staffId);
    
    // Visual feedback
    document.querySelectorAll('#staff-selection .card').forEach(card => {
        card.classList.remove('border-primary');
    });
    event.currentTarget.classList.add('border-primary');
    
    document.getElementById('next-step-2').disabled = false;
}

function updateAvailableSlots() {
    const selectedDate = document.getElementById('booking-date').value;
    const timeSlotsContainer = document.getElementById('time-slots');
    
    if (!selectedDate || !selectedStaff) return;
    
    // Generate time slots (9 AM to 8 PM)
    const timeSlots = [];
    for (let hour = 9; hour <= 20; hour++) {
        const time = `${hour.toString().padStart(2, '0')}:00`;
        const isBooked = bookedSlots.some(slot => 
            slot.date === selectedDate && 
            slot.time === time && 
            slot.staff_id === selectedStaff.id
        );
        
        timeSlots.push({ time, isBooked });
    }
    
    timeSlotsContainer.innerHTML = timeSlots.map(slot => `
        <button class="btn ${slot.isBooked ? 'btn-outline-secondary' : 'btn-outline-primary'} me-2 mb-2" 
                ${slot.isBooked ? 'disabled' : `onclick="selectTimeSlot('${slot.time}')"`}>
            ${slot.time} ${slot.isBooked ? '(Booked)' : ''}
        </button>
    `).join('');
}

function selectTimeSlot(time) {
    const selectedDate = document.getElementById('booking-date').value;
    selectedDateTime = { date: selectedDate, time: time };
    
    // Visual feedback
    document.querySelectorAll('#time-slots .btn').forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline-primary');
    });
    event.target.classList.remove('btn-outline-primary');
    event.target.classList.add('btn-primary');
    
    document.getElementById('next-step-3').disabled = false;
}

function confirmBooking() {
    const customerName = document.getElementById('customer-name').value;
    const customerPhone = document.getElementById('customer-phone').value;
    const customerEmail = document.getElementById('customer-email').value;
    
    if (!customerName || !customerPhone || !customerEmail) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Show confirmation
    const bookingSummary = document.getElementById('booking-summary');
    bookingSummary.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h6>Booking Details:</h6>
                <p><strong>Service:</strong> ${selectedService.name}</p>
                <p><strong>Therapist:</strong> ${selectedStaff.name}</p>
                <p><strong>Date & Time:</strong> ${selectedDateTime.date} at ${selectedDateTime.time}</p>
                <p><strong>Duration:</strong> ${selectedService.duration} minutes</p>
                <p><strong>Price:</strong> Rp ${selectedService.price.toLocaleString()}</p>
                <hr>
                <p><strong>Customer:</strong> ${customerName}</p>
                <p><strong>Phone:</strong> ${customerPhone}</p>
                <p><strong>Email:</strong> ${customerEmail}</p>
            </div>
        </div>
        <div class="alert alert-success mt-3">
            <i class="fas fa-envelope me-2"></i>
            Confirmation email has been sent to ${customerEmail}
        </div>
    `;
    
    nextStep(5);
}

function newBooking() {
    // Reset all selections
    selectedService = null;
    selectedStaff = null;
    selectedDateTime = null;
    
    // Reset form
    renderBookingForm();
}
