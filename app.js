// Enhanced Spa Services Data
const spaServices = [
    {
        id: 1,
        name: 'Swedish Massage',
        duration: 60,
        price: 150000,
        description: 'Relaxing full body massage to relieve stress and tension',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400',
        benefits: ['Stress relief', 'Muscle relaxation', 'Improved circulation']
    },
    {
        id: 2,
        name: 'Deep Tissue Massage',
        duration: 90,
        price: 200000,
        description: 'Therapeutic massage targeting deep muscle layers',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        benefits: ['Pain relief', 'Muscle recovery', 'Improved flexibility']
    },
    {
        id: 3,
        name: 'Facial Treatment',
        duration: 60,
        price: 120000,
        description: 'Rejuvenating facial for healthy, glowing skin',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400',
        benefits: ['Skin rejuvenation', 'Deep cleansing', 'Anti-aging']
    },
    {
        id: 4,
        name: 'Body Scrub',
        duration: 45,
        price: 100000,
        description: 'Exfoliating treatment for smooth, soft skin',
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400',
        benefits: ['Skin exfoliation', 'Improved texture', 'Deep moisturizing']
    }
];

// Enhanced Staff Data
const spaStaff = [
    {
        id: 1,
        name: 'Maya Sari',
        specialties: [1, 2], // Swedish & Deep Tissue
        photo: 'https://file.indonesianfilmcenter.com/uploads/2019-08/7f6ed71975a128c7fd22718a187661e9.jpg',
        bio: 'Certified massage therapist with 8 years experience',
        rating: 4.9,
        experience: '8 years'
    },
    {
        id: 2,
        name: 'Dewi Lestari',
        specialties: [3], // Facial
        photo: 'https://statik.tempo.co/data/2018/01/19/id_677760/677760_720.jpg',
        bio: 'Licensed esthetician specializing in facial treatments',
        rating: 4.8,
        experience: '6 years'
    },
    {
        id: 3,
        name: 'Sari Indah',
        specialties: [4], // Body Scrub
        photo: 'https://asset.kompas.com/crops/x8V6jzQ6bCoKduPv2-YTbHQyVR0=/9x14:944x637/1200x800/data/photo/2018/03/01/2597139576.jpg',
        bio: 'Body treatment specialist with holistic approach',
        rating: 4.7,
        experience: '5 years'
    }
];

// Mock booked slots (for demonstration)
const bookedSlots = [
    { date: '2025-07-28', time: '10:00', staff_id: 1 },
    { date: '2025-07-28', time: '14:00', staff_id: 2 },
    { date: '2025-07-29', time: '09:00', staff_id: 1 },
    { date: '2025-07-29', time: '16:00', staff_id: 3 },
    { date: '2025-07-30', time: '11:00', staff_id: 2 }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderServices();
    renderBookingForm();
});

// Enhanced service rendering with hover effects
function renderServices() {
    const servicesGrid = document.getElementById('services-grid');
    
    servicesGrid.innerHTML = spaServices.map(service => `
        <div class="col-md-6 col-lg-3 mb-4">
            <div class="card h-100 shadow-sm service-card">
                <img src="${service.image}" class="card-img-top" alt="${service.name}" style="height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${service.name}</h5>
                    <p class="card-text">${service.description}</p>
                    <div class="mb-2">
                        ${service.benefits.map(benefit => `<span class="badge bg-light text-dark me-1 mb-1">${benefit}</span>`).join('')}
                    </div>
                    <div class="mt-auto">
                        <p class="mb-1"><strong>Duration:</strong> ${service.duration} minutes</p>
                        <p class="mb-2 price-highlight"><strong>Price:</strong> Rp ${service.price.toLocaleString()}</p>
                        <button class="btn btn-primary btn-custom w-100" onclick="selectService(${service.id})">
                            <i class="fas fa-calendar-plus me-2"></i>Select Service
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Enhanced booking form with progress indicator
function renderBookingForm() {
    const bookingForm = document.getElementById('booking-form');
    
    bookingForm.innerHTML = `
        <div class="booking-steps">
            <div class="step" id="step-1">
                <h4 class="mb-4"><i class="fas fa-spa me-2 text-primary"></i>Step 1: Choose Service</h4>
                <select class="form-select mb-3" id="service-select" onchange="updateServiceSelection()">
                    <option value="">Select a service...</option>
                    ${spaServices.map(service => `
                        <option value="${service.id}">${service.name} - ${service.duration}min - Rp ${service.price.toLocaleString()}</option>
                    `).join('')}
                </select>
                <div id="service-details" class="d-none mb-3"></div>
                <button class="btn btn-primary btn-custom" onclick="nextStep(2)" id="next-step-1" disabled>
                    <i class="fas fa-arrow-right me-2"></i>Next: Choose Therapist
                </button>
            </div>
            
            <div class="step d-none" id="step-2">
                <h4 class="mb-4"><i class="fas fa-user-md me-2 text-primary"></i>Step 2: Choose Therapist</h4>
                <div id="staff-selection" class="mb-3"></div>
                <div class="d-flex gap-2">
                    <button class="btn btn-outline-secondary btn-custom" onclick="prevStep(1)">
                        <i class="fas fa-arrow-left me-2"></i>Previous
                    </button>
                    <button class="btn btn-primary btn-custom" onclick="nextStep(3)" id="next-step-2" disabled>
                        <i class="fas fa-arrow-right me-2"></i>Next: Select Time
                    </button>
                </div>
            </div>
            
            <div class="step d-none" id="step-3">
                <h4 class="mb-4"><i class="fas fa-calendar-alt me-2 text-primary"></i>Step 3: Select Date & Time</h4>
                <div class="row">
                    <div class="col-md-6">
                        <label class="form-label"><i class="fas fa-calendar me-2"></i>Select Date</label>
                        <input type="date" class="form-control" id="booking-date" onchange="updateAvailableSlots()" min="${new Date().toISOString().split('T')[0]}">
                    </div>
                    <div class="col-md-6">
                        <label class="form-label"><i class="fas fa-clock me-2"></i>Available Time Slots</label>
                        <div id="time-slots" class="mt-2"></div>
                    </div>
                </div>
                <div class="d-flex gap-2 mt-3">
                    <button class="btn btn-outline-secondary btn-custom" onclick="prevStep(2)">
                        <i class="fas fa-arrow-left me-2"></i>Previous
                    </button>
                    <button class="btn btn-primary btn-custom" onclick="nextStep(4)" id="next-step-3" disabled>
                        <i class="fas fa-arrow-right me-2"></i>Next: Contact Details
                    </button>
                </div>
            </div>
            
            <div class="step d-none" id="step-4">
                <h4 class="mb-4"><i class="fas fa-user me-2 text-primary"></i>Step 4: Contact Information</h4>
                <div class="row">
                    <div class="col-md-6">
                        <label class="form-label"><i class="fas fa-user me-2"></i>Full Name</label>
                        <input type="text" class="form-control" id="customer-name" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label"><i class="fas fa-phone me-2"></i>Phone Number</label>
                        <input type="tel" class="form-control" id="customer-phone" required>
                    </div>
                </div>
                <div class="mt-3">
                    <label class="form-label"><i class="fas fa-envelope me-2"></i>Email Address</label>
                    <input type="email" class="form-control" id="customer-email" required>
                </div>
                <div class="mt-3">
                    <label class="form-label"><i class="fas fa-comment me-2"></i>Special Requests (Optional)</label>
                    <textarea class="form-control" id="special-requests" rows="3" placeholder="Any special requirements or preferences?"></textarea>
                </div>
                <div class="d-flex gap-2 mt-3">
                    <button class="btn btn-outline-secondary btn-custom" onclick="prevStep(3)">
                        <i class="fas fa-arrow-left me-2"></i>Previous
                    </button>
                    <button class="btn btn-success btn-custom" onclick="confirmBooking()">
                        <i class="fas fa-check me-2"></i>Confirm Booking
                    </button>
                </div>
            </div>
            
            <div class="step d-none" id="step-5">
                <div class="text-center">
                    <i class="fas fa-check-circle text-success confirmation-icon" style="font-size: 4rem;"></i>
                    <h4 class="mt-3 text-success">Booking Confirmed!</h4>
                    <div id="booking-summary" class="mt-3"></div>
                    <button class="btn btn-primary btn-custom mt-3" onclick="newBooking()">
                        <i class="fas fa-plus me-2"></i>Make Another Booking
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Booking form functions
let selectedService = null;
let selectedStaff = null;
let selectedDateTime = null;
let currentStep = 1;

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
        
        // Show service details with benefits
        const serviceDetails = document.getElementById('service-details');
        serviceDetails.className = 'alert alert-info';
        serviceDetails.innerHTML = `
            <div class="row">
                <div class="col-md-8">
                    <strong>${selectedService.name}</strong><br>
                    <span class="text-muted">${selectedService.description}</span><br>
                    <small><strong>Duration:</strong> ${selectedService.duration} minutes</small><br>
                    <small><strong>Benefits:</strong> ${selectedService.benefits.join(', ')}</small>
                </div>
                <div class="col-md-4 text-end">
                    <span class="price-highlight">Rp ${selectedService.price.toLocaleString()}</span>
                </div>
            </div>
        `;
    } else {
        selectedService = null;
        nextBtn.disabled = true;
        document.getElementById('service-details').className = 'd-none';
    }
}

function updateProgress(step) {
    // Show progress indicator
    document.getElementById('step-progress').classList.remove('d-none');
    
    // Update progress items
    for (let i = 1; i <= 4; i++) {
        const progressItem = document.getElementById(`progress-${i}`);
        if (i < step) {
            progressItem.classList.remove('active');
            progressItem.classList.add('completed');
        } else if (i === step) {
            progressItem.classList.remove('completed');
            progressItem.classList.add('active');
        } else {
            progressItem.classList.remove('active', 'completed');
        }
    }
    currentStep = step;
}

function nextStep(stepNumber) {
    // Hide current step with fade effect
    document.querySelectorAll('.step').forEach(step => {
        step.classList.add('d-none');
    });
    
    // Show target step
    const targetStep = document.getElementById(`step-${stepNumber}`);
    targetStep.classList.remove('d-none');
    
    // Update progress
    updateProgress(stepNumber);
    
    // Load step-specific content
    if (stepNumber === 2) {
        loadStaffSelection();
    } else if (stepNumber === 3) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('booking-date').min = today;
    }
    
    // Scroll to booking section
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

function prevStep(stepNumber) {
    document.querySelectorAll('.step').forEach(step => step.classList.add('d-none'));
    document.getElementById(`step-${stepNumber}`).classList.remove('d-none');
    updateProgress(stepNumber);
}

function loadStaffSelection() {
    const staffSelection = document.getElementById('staff-selection');
    const availableStaff = spaStaff.filter(staff => 
        staff.specialties.includes(selectedService.id)
    );
    
    staffSelection.innerHTML = availableStaff.map(staff => `
        <div class="card mb-3 staff-card" onclick="selectStaff(${staff.id})" style="cursor: pointer;">
            <div class="row g-0">
                <div class="col-md-3">
                    <img src="${staff.photo}" class="img-fluid rounded-start h-100" style="object-fit: cover;" alt="${staff.name}">
                </div>
                <div class="col-md-9">
                    <div class="card-body">
                        <h5 class="card-title">
                            ${staff.name}
                            <span class="badge bg-warning text-dark ms-2">
                                <i class="fas fa-star"></i> ${staff.rating}
                            </span>
                        </h5>
                        <p class="card-text">${staff.bio}</p>
                        <p class="card-text">
                            <small class="text-muted">
                                <i class="fas fa-clock me-1"></i>${staff.experience} experience
                            </small>
                        </p>
                        <button class="btn btn-outline-primary btn-custom">
                            <i class="fas fa-hand-paper me-2"></i>Select ${staff.name}
                        </button>
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
        card.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    
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
        <button class="btn ${slot.isBooked ? 'btn-outline-secondary' : 'btn-outline-primary'} time-slot" 
                ${slot.isBooked ? 'disabled' : `onclick="selectTimeSlot('${slot.time}')"`}>
            <i class="fas fa-clock me-1"></i>${slot.time} ${slot.isBooked ? '(Booked)' : ''}
        </button>
    `).join('');
}

function selectTimeSlot(time) {
    const selectedDate = document.getElementById('booking-date').value;
    selectedDateTime = { date: selectedDate, time: time };
    
    // Visual feedback
    document.querySelectorAll('#time-slots .btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
    
    document.getElementById('next-step-3').disabled = false;
}

function confirmBooking() {
    const customerName = document.getElementById('customer-name').value;
    const customerPhone = document.getElementById('customer-phone').value;
    const customerEmail = document.getElementById('customer-email').value;
    const specialRequests = document.getElementById('special-requests').value;
    
    if (!customerName || !customerPhone || !customerEmail) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Generate booking reference
    const bookingRef = 'SPA' + Date.now().toString().slice(-6);
    
    // Show confirmation
    const bookingSummary = document.getElementById('booking-summary');
    bookingSummary.innerHTML = `
        <div class="card booking-summary-card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <h6><i class="fas fa-info-circle me-2"></i>Booking Details:</h6>
                        <p><strong>Reference:</strong> ${bookingRef}</p>
                        <p><strong>Service:</strong> ${selectedService.name}</p>
                        <p><strong>Therapist:</strong> ${selectedStaff.name}</p>
                        <p><strong>Date & Time:</strong> ${formatDate(selectedDateTime.date)} at ${selectedDateTime.time}</p>
                        <p><strong>Duration:</strong> ${selectedService.duration} minutes</p>
                    </div>
                    <div class="col-md-6">
                        <h6><i class="fas fa-user me-2"></i>Customer Details:</h6>
                        <p><strong>Name:</strong> ${customerName}</p>
                        <p><strong>Phone:</strong> ${customerPhone}</p>
                        <p><strong>Email:</strong> ${customerEmail}</p>
                        ${specialRequests ? `<p><strong>Special Requests:</strong> ${specialRequests}</p>` : ''}
                        <p class="price-highlight"><strong>Total Price:</strong> Rp ${selectedService.price.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="alert alert-success mt-3">
            <i class="fas fa-envelope me-2"></i>
            Confirmation email has been sent to ${customerEmail}
        </div>
        <div class="alert alert-info">
            <i class="fas fa-info-circle me-2"></i>
            Please arrive 15 minutes before your appointment. A deposit of 30% is required to secure your booking.
        </div>
    `;
    
    nextStep(5);
}

function formatDate(dateString) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function newBooking() {
    // Reset all selections
    selectedService = null;
    selectedStaff = null;
    selectedDateTime = null;
    currentStep = 1;
    
    // Hide progress indicator
    document.getElementById('step-progress').classList.add('d-none');
    
    // Reset form
    renderBookingForm();
    
    // Scroll to top of booking section
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}
