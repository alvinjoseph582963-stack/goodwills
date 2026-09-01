/**
 * GOODWILL HOLIDAYS – Booking / Inquiry Flow JS
 * Multi-step inquiry form with WhatsApp/phone/email submission
 */

(function() {
    'use strict';

    // ─── Booking Wizard State ─────────────────────────────────────────────────
    let bookingState = {
        step: 1,
        service: '',
        serviceLabel: '',
        destination: '',
        dates: '',
        guests: 1,
        name: '',
        phone: '',
        email: '',
        notes: ''
    };

    const STEPS = [
        { id: 1, title: 'Choose Service', icon: '1' },
        { id: 2, title: 'Your Journey', icon: '2' },
        { id: 3, title: 'Select Dates', icon: '3' },
        { id: 4, title: 'Your Details', icon: '4' },
        { id: 5, title: 'Review & Send', icon: '5' }
    ];

    // ─── Render Step Indicator ────────────────────────────────────────────────

    function renderStepIndicator() {
        const indicator = document.querySelector('.booking-steps');
        if (!indicator) return;

        indicator.innerHTML = STEPS.map(step => `
            <div class="step-item ${bookingState.step === step.id ? 'active' : ''} ${bookingState.step > step.id ? 'completed' : ''}"
                 aria-current="${bookingState.step === step.id ? 'step' : 'false'}">
                <div class="step-circle">
                    ${bookingState.step > step.id
                        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>'
                        : step.id}
                </div>
                <span class="step-label">${step.title}</span>
            </div>
            ${step.id < STEPS.length ? '<div class="step-connector" aria-hidden="true"></div>' : ''}
        `).join('');
    }

    // ─── Render Step Content ──────────────────────────────────────────────────

    function renderStepContent() {
        const container = document.querySelector('.booking-step-content');
        if (!container) return;

        container.innerHTML = '';
        container.setAttribute('aria-live', 'polite');

        switch (bookingState.step) {
            case 1:
                renderStep1(container);
                break;
            case 2:
                renderStep2(container);
                break;
            case 3:
                renderStep3(container);
                break;
            case 4:
                renderStep4(container);
                break;
            case 5:
                renderStep5(container);
                break;
        }

        renderNavButtons();
    }

    function renderStep1(container) {
        const services = [
            { id: 'airport', label: 'Airport Transfer', icon: '', desc: 'Pickup or drop at airport' },
            { id: 'homestay', label: 'Homestay', icon: '', desc: 'Comfortable family stays' },
            { id: 'taxi', label: 'Taxi / Cab', icon: '', desc: 'Point-to-point cab service' }
        ];

        container.innerHTML = `
            <h2 class="booking-step-heading">What are you looking for?</h2>
            <p class="booking-step-sub">Select the service you'd like to enquire about.</p>
            <div class="service-selector-grid" role="radiogroup" aria-label="Service type">
                ${services.map(svc => `
                    <label class="service-option ${bookingState.service === svc.id ? 'selected' : ''}">
                        <input type="radio" name="service" value="${svc.id}" class="sr-only"
                            ${bookingState.service === svc.id ? 'checked' : ''} />
                        <span class="service-option__icon" aria-hidden="true">${svc.icon}</span>
                        <span class="service-option__label">${svc.label}</span>
                        <span class="service-option__desc">${svc.desc}</span>
                    </label>
                `).join('')}
            </div>
        `;

        container.querySelectorAll('input[name="service"]').forEach(input => {
            input.addEventListener('change', () => {
                container.querySelectorAll('.service-option').forEach(opt => opt.classList.remove('selected'));
                input.closest('.service-option').classList.add('selected');
                const svcLabel = services.find(s => s.id === input.value)?.label || '';
                bookingState.service = input.value;
                bookingState.serviceLabel = svcLabel;
            });
        });
    }

    function renderStep2(container) {
        const destinationOptions = typeof destinations !== 'undefined'
            ? destinations.map(d => `<option value="${d.name}">${d.name}, ${d.state}</option>`).join('')
            : '';

        container.innerHTML = `
            <h2 class="booking-step-heading">Your Journey Details</h2>
            <p class="booking-step-sub">Tell us where you'd like to go.</p>
            <div class="booking-form-fields">
                <div class="form-group">
                    <label for="booking-destination" class="form-label">Destination / Route</label>
                    <select id="booking-destination" class="form-select" aria-required="true">
                        <option value="">Select a destination...</option>
                        ${destinationOptions}
                        <option value="Custom">Custom / Not listed</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="booking-pickup" class="form-label">Pickup Location</label>
                    <input type="text" id="booking-pickup" class="form-input"
                        placeholder="e.g. Kochi International Airport, Hotel name, City"
                        value="${bookingState.pickup || ''}" />
                </div>
                <div class="form-group">
                    <label for="booking-guests" class="form-label">Number of Guests</label>
                    <div class="guest-counter">
                        <button type="button" class="counter-btn" id="guests-minus" aria-label="Decrease guests">−</button>
                        <span class="counter-value" id="guests-display">${bookingState.guests}</span>
                        <button type="button" class="counter-btn" id="guests-plus" aria-label="Increase guests">+</button>
                    </div>
                </div>
                <div class="form-group" id="vehicle-group">
                    <label class="form-label">Vehicle Preference (optional)</label>
                    <div class="vehicle-chips">
                        <button type="button" class="vehicle-chip ${bookingState.vehicle === 'sedan' ? 'selected' : ''}" data-vehicle="sedan">Sedan (1-4)</button>
                        <button type="button" class="vehicle-chip ${bookingState.vehicle === 'suv' ? 'selected' : ''}" data-vehicle="suv">SUV (1-6)</button>
                        <button type="button" class="vehicle-chip ${bookingState.vehicle === 'tempo' ? 'selected' : ''}" data-vehicle="tempo">Tempo (7-12)</button>
                    </div>
                </div>
            </div>
        `;

        const destSelect = container.querySelector('#booking-destination');
        if (destSelect && bookingState.destination) destSelect.value = bookingState.destination;
        destSelect?.addEventListener('change', () => { bookingState.destination = destSelect.value; });

        const pickupInput = container.querySelector('#booking-pickup');
        pickupInput?.addEventListener('input', () => { bookingState.pickup = pickupInput.value; });

        // Guest counter
        const display = container.querySelector('#guests-display');
        container.querySelector('#guests-minus')?.addEventListener('click', () => {
            if (bookingState.guests > 1) { bookingState.guests--; display.textContent = bookingState.guests; }
        });
        container.querySelector('#guests-plus')?.addEventListener('click', () => {
            if (bookingState.guests < 50) { bookingState.guests++; display.textContent = bookingState.guests; }
        });

        // Vehicle chips
        container.querySelectorAll('.vehicle-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                container.querySelectorAll('.vehicle-chip').forEach(c => c.classList.remove('selected'));
                chip.classList.add('selected');
                bookingState.vehicle = chip.dataset.vehicle;
            });
        });
    }

    function renderStep3(container) {
        const today = new Date().toISOString().split('T')[0];

        container.innerHTML = `
            <h2 class="booking-step-heading">When are you travelling?</h2>
            <p class="booking-step-sub">Select your preferred travel dates.</p>
            <div class="booking-form-fields">
                <div class="form-group">
                    <label for="booking-start-date" class="form-label">Start Date</label>
                    <input type="date" id="booking-start-date" class="form-input"
                        min="${today}" value="${bookingState.startDate || today}" />
                </div>
                <div class="form-group">
                    <label for="booking-end-date" class="form-label">End Date / Return Date</label>
                    <input type="date" id="booking-end-date" class="form-input"
                        min="${today}" value="${bookingState.endDate || ''}" />
                </div>
                <div class="form-group">
                    <label for="booking-flexibility" class="form-label">Date Flexibility</label>
                    <select id="booking-flexibility" class="form-select">
                        <option value="exact">Exact dates</option>
                        <option value="flexible-3">± 3 days flexible</option>
                        <option value="flexible-7">± 1 week flexible</option>
                        <option value="flexible-any">Very flexible</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="booking-time" class="form-label">Preferred Pickup Time (if applicable)</label>
                    <input type="time" id="booking-time" class="form-input" value="${bookingState.time || '08:00'}" />
                </div>
            </div>
        `;

        container.querySelector('#booking-start-date')?.addEventListener('change', (e) => {
            bookingState.startDate = e.target.value;
            const endInput = container.querySelector('#booking-end-date');
            if (endInput && e.target.value > endInput.value) {
                endInput.min = e.target.value;
                endInput.value = e.target.value;
                bookingState.endDate = e.target.value;
            }
        });
        container.querySelector('#booking-end-date')?.addEventListener('change', (e) => { bookingState.endDate = e.target.value; });
        container.querySelector('#booking-time')?.addEventListener('change', (e) => { bookingState.time = e.target.value; });
    }

    function renderStep4(container) {
        container.innerHTML = `
            <h2 class="booking-step-heading">Tell us about yourself</h2>
            <p class="booking-step-sub">We'll use this to send you the booking confirmation.</p>
            <div class="booking-form-fields">
                <div class="form-group">
                    <label for="booking-name" class="form-label">Full Name <span aria-hidden="true">*</span></label>
                    <input type="text" id="booking-name" class="form-input"
                        placeholder="Your name" value="${bookingState.name}"
                        required aria-required="true" autocomplete="name" />
                    <span class="form-error" id="name-error" role="alert" aria-live="polite"></span>
                </div>
                <div class="form-group">
                    <label for="booking-phone" class="form-label">Phone / WhatsApp <span aria-hidden="true">*</span></label>
                    <input type="tel" id="booking-phone" class="form-input"
                        placeholder="+91 98765 43210" value="${bookingState.phone}"
                        required aria-required="true" autocomplete="tel" />
                    <span class="form-error" id="phone-error" role="alert" aria-live="polite"></span>
                </div>
                <div class="form-group">
                    <label for="booking-email" class="form-label">Email Address</label>
                    <input type="email" id="booking-email" class="form-input"
                        placeholder="you@example.com" value="${bookingState.email}"
                        autocomplete="email" />
                </div>
                <div class="form-group">
                    <label for="booking-notes" class="form-label">Special Requests / Notes</label>
                    <textarea id="booking-notes" class="form-textarea" rows="3"
                        placeholder="Any special requirements, dietary needs, accessibility needs, or questions...">${bookingState.notes}</textarea>
                </div>
            </div>
        `;

        container.querySelector('#booking-name')?.addEventListener('input', (e) => { bookingState.name = e.target.value; });
        container.querySelector('#booking-phone')?.addEventListener('input', (e) => { bookingState.phone = e.target.value; });
        container.querySelector('#booking-email')?.addEventListener('input', (e) => { bookingState.email = e.target.value; });
        container.querySelector('#booking-notes')?.addEventListener('input', (e) => { bookingState.notes = e.target.value; });
    }

    function renderStep5(container) {
        const vehicleLabels = { sedan: 'Sedan', suv: 'Premium SUV', tempo: 'Tempo Traveller' };
        const waMessage = formatBookingMessage();

        container.innerHTML = `
            <h2 class="booking-step-heading">Review Your Request</h2>
            <p class="booking-step-sub">Please confirm your details before sending the inquiry.</p>

            <div class="booking-review-card glass-card">
                <div class="review-row">
                    <span class="review-label">Service</span>
                    <span class="review-value">${bookingState.serviceLabel || 'Not selected'}</span>
                </div>
                <div class="review-row">
                    <span class="review-label">Destination</span>
                    <span class="review-value">${bookingState.destination || 'Not specified'}</span>
                </div>
                ${bookingState.pickup ? `
                <div class="review-row">
                    <span class="review-label">Pickup</span>
                    <span class="review-value">${bookingState.pickup}</span>
                </div>` : ''}
                <div class="review-row">
                    <span class="review-label">Dates</span>
                    <span class="review-value">${formatDateRange()}</span>
                </div>
                <div class="review-row">
                    <span class="review-label">Guests</span>
                    <span class="review-value">${bookingState.guests} guest${bookingState.guests !== 1 ? 's' : ''}</span>
                </div>
                ${bookingState.vehicle ? `
                <div class="review-row">
                    <span class="review-label">Vehicle</span>
                    <span class="review-value">${vehicleLabels[bookingState.vehicle] || bookingState.vehicle}</span>
                </div>` : ''}
                <div class="review-row">
                    <span class="review-label">Name</span>
                    <span class="review-value">${bookingState.name || 'Not provided'}</span>
                </div>
                <div class="review-row">
                    <span class="review-label">Phone</span>
                    <span class="review-value">${bookingState.phone || 'Not provided'}</span>
                </div>
                ${bookingState.email ? `
                <div class="review-row">
                    <span class="review-label">Email</span>
                    <span class="review-value">${bookingState.email}</span>
                </div>` : ''}
                ${bookingState.notes ? `
                <div class="review-row">
                    <span class="review-label">Notes</span>
                    <span class="review-value">${bookingState.notes}</span>
                </div>` : ''}
            </div>

            <div class="booking-info-box">
                <p>✓ This is a <strong>booking inquiry</strong>, not a confirmed reservation.</p>
                <p>Our team will contact you within <strong>30 minutes</strong> to confirm availability and pricing.</p>
            </div>

            <div class="booking-submit-actions">
                <button class="btn btn--primary btn--full btn--lg booking-whatsapp-btn"
                    id="submit-whatsapp">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Send via WhatsApp
                </button>
                <a href="tel:${typeof GOODWILL_CONFIG !== 'undefined' ? GOODWILL_CONFIG.phoneRaw : ''}"
                   class="btn btn--outline btn--full">
                    Call Us Directly
                </a>
                <button class="btn btn--ghost btn--full" id="submit-email">
                    Send via Email
                </button>
            </div>
        `;

        container.querySelector('#submit-whatsapp')?.addEventListener('click', () => {
            if (typeof generateWhatsAppURL === 'function') {
                window.open(generateWhatsAppURL(waMessage), '_blank', 'noopener,noreferrer');
                showConfirmation();
            }
        });

        container.querySelector('#submit-email')?.addEventListener('click', () => {
            if (typeof generateMailtoURL === 'function') {
                window.location.href = generateMailtoURL(
                    `Booking Inquiry – ${bookingState.serviceLabel}`,
                    waMessage
                );
            }
        });
    }

    function showConfirmation() {
        const container = document.querySelector('.booking-step-content');
        if (!container) return;

        container.innerHTML = `
            <div class="booking-success">
                <div class="success-icon" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                <h2>Inquiry Sent!</h2>
                <p>Your inquiry has been opened in WhatsApp. Our team will respond within 30 minutes.</p>
                <div class="success-contact">
                    <p>You can also reach us at:</p>
                    <a href="tel:${typeof GOODWILL_CONFIG !== 'undefined' ? GOODWILL_CONFIG.phoneRaw : ''}" class="btn btn--outline">
                        ${typeof GOODWILL_CONFIG !== 'undefined' ? GOODWILL_CONFIG.phone : ''}
                    </a>
                </div>
                <button class="btn btn--ghost" id="restart-booking">Start a new inquiry</button>
            </div>
        `;

        container.querySelector('#restart-booking')?.addEventListener('click', () => {
            bookingState = { step: 1, service: '', serviceLabel: '', destination: '', dates: '', guests: 1, name: '', phone: '', email: '', notes: '' };
            renderStepIndicator();
            renderStepContent();
        });
    }

    // ─── Navigation Buttons ───────────────────────────────────────────────────

    function renderNavButtons() {
        const navContainer = document.querySelector('.booking-nav-buttons');
        if (!navContainer) return;

        navContainer.innerHTML = `
            ${bookingState.step > 1 && bookingState.step <= 5 ? `
                <button class="btn btn--ghost" id="booking-prev">← Back</button>
            ` : '<div></div>'}
            ${bookingState.step < 5 ? `
                <button class="btn btn--primary" id="booking-next">Continue →</button>
            ` : ''}
        `;

        document.querySelector('#booking-prev')?.addEventListener('click', () => {
            if (bookingState.step > 1) {
                bookingState.step--;
                renderStepIndicator();
                renderStepContent();
                document.querySelector('.booking-step-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });

        document.querySelector('#booking-next')?.addEventListener('click', () => {
            if (validateCurrentStep()) {
                bookingState.step++;
                renderStepIndicator();
                renderStepContent();
                document.querySelector('.booking-step-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // ─── Validation ───────────────────────────────────────────────────────────

    function validateCurrentStep() {
        switch (bookingState.step) {
            case 1:
                if (!bookingState.service) {
                    const msg = document.createElement('p');
                    msg.className = 'validation-message';
                    msg.textContent = 'Please select a service to continue.';
                    msg.setAttribute('role', 'alert');
                    const existing = document.querySelector('.validation-message');
                    if (existing) existing.remove();
                    document.querySelector('.booking-step-content')?.appendChild(msg);
                    return false;
                }
                return true;
            case 4:
                let valid = true;
                const name = document.querySelector('#booking-name');
                const phone = document.querySelector('#booking-phone');
                const nameError = document.querySelector('#name-error');
                const phoneError = document.querySelector('#phone-error');

                if (!name?.value.trim()) {
                    if (nameError) nameError.textContent = 'Please enter your name.';
                    name?.focus();
                    valid = false;
                } else {
                    if (nameError) nameError.textContent = '';
                    bookingState.name = name.value.trim();
                }

                if (!phone?.value.trim() || !/^[\+0-9\s\-]{7,15}$/.test(phone.value.trim())) {
                    if (phoneError) phoneError.textContent = 'Please enter a valid phone number.';
                    if (valid) phone?.focus();
                    valid = false;
                } else {
                    if (phoneError) phoneError.textContent = '';
                    bookingState.phone = phone.value.trim();
                }

                return valid;
            default:
                return true;
        }
    }

    // ─── Utility ──────────────────────────────────────────────────────────────

    function formatDateRange() {
        if (!bookingState.startDate) return 'Dates not selected';
        const start = new Date(bookingState.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
        if (!bookingState.endDate) return start;
        const end = new Date(bookingState.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
        return `${start} → ${end}`;
    }

    function formatBookingMessage() {
        const vehicleLabels = { sedan: 'Sedan (1-4 pax)', suv: 'Premium SUV (1-6 pax)', tempo: 'Tempo Traveller (7-12 pax)' };
        return `Hello Goodwill Holidays!\n\nI would like to enquire about:\n\n• Service: ${bookingState.serviceLabel}\n• Destination: ${bookingState.destination || 'To be discussed'}${bookingState.pickup ? '\n• Pickup: ' + bookingState.pickup : ''}\n• Dates: ${formatDateRange()}\n• Guests: ${bookingState.guests}${bookingState.vehicle ? '\n• Vehicle: ' + (vehicleLabels[bookingState.vehicle] || bookingState.vehicle) : ''}\n\n• Name: ${bookingState.name}\n• Phone: ${bookingState.phone}${bookingState.email ? '\n• Email: ' + bookingState.email : ''}${bookingState.notes ? '\n\n• Notes: ' + bookingState.notes : ''}\n\nPlease share availability and pricing. Thank you!`;
    }

    // ─── Airport Transfer Form ────────────────────────────────────────────────

    function initAirportTransferForm() {
        const form = document.querySelector('.airport-transfer-form');
        if (!form) return;

        const today = new Date().toISOString().split('T')[0];
        form.querySelectorAll('input[type="date"]').forEach(input => {
            input.min = today;
            if (!input.value) input.value = today;
        });

        // Vehicle card selection
        form.querySelectorAll('.vehicle-card').forEach(card => {
            card.addEventListener('click', () => {
                form.querySelectorAll('.vehicle-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                const selectedVehicle = card.dataset.vehicle;

                // Update estimate
                const estEl = document.querySelector('.fare-estimate-value');
                if (estEl && typeof vehicles !== 'undefined') {
                    const veh = vehicles.find(v => v.id === selectedVehicle);
                    if (veh) {
                        estEl.textContent = `₹${veh.priceBase.toLocaleString('en-IN')} onwards`;
                    }
                }
            });
        });

        // Form submit
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const pickup = form.querySelector('#transfer-pickup')?.value;
            const dropoff = form.querySelector('#transfer-dropoff')?.value;
            const date = form.querySelector('#transfer-date')?.value;
            const time = form.querySelector('#transfer-time')?.value;
            const passengers = form.querySelector('#transfer-passengers')?.value;

            if (!pickup || !dropoff || !date) {
                showFormError(form, 'Please fill in all required fields.');
                return;
            }

            const message = formatTransferInquiry(pickup, dropoff, date, time || 'To be confirmed', passengers || '1');

            if (typeof generateWhatsAppURL === 'function') {
                window.open(generateWhatsAppURL(message), '_blank', 'noopener,noreferrer');
            }
        });
    }

    function showFormError(form, message) {
        let errorEl = form.querySelector('.form-global-error');
        if (!errorEl) {
            errorEl = document.createElement('div');
            errorEl.className = 'form-global-error';
            errorEl.setAttribute('role', 'alert');
            form.prepend(errorEl);
        }
        errorEl.textContent = message;
        setTimeout(() => { errorEl.textContent = ''; }, 4000);
    }

    // ─── Contact Form ─────────────────────────────────────────────────────────

    function initContactForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = form.querySelector('#contact-name')?.value.trim();
            const phone = form.querySelector('#contact-phone')?.value.trim();
            const service = form.querySelector('#contact-service')?.value;
            const message = form.querySelector('#contact-message')?.value.trim();

            if (!name || !phone || !message) {
                showFormError(form, 'Please fill in all required fields.');
                return;
            }

            const waMsg = formatGeneralInquiry(
                service || 'General Enquiry',
                `Name: ${name}\nPhone: ${phone}\n\n${message}`
            );

            if (typeof generateWhatsAppURL === 'function') {
                window.open(generateWhatsAppURL(waMsg), '_blank', 'noopener,noreferrer');
                form.reset();
                showFormSuccess(form, 'Your inquiry is ready to send on WhatsApp!');
            }
        });
    }

    function showFormSuccess(form, message) {
        let successEl = form.querySelector('.form-global-success');
        if (!successEl) {
            successEl = document.createElement('div');
            successEl.className = 'form-global-success';
            successEl.setAttribute('role', 'status');
            form.appendChild(successEl);
        }
        successEl.textContent = message;
    }

    // ─── Initialize ───────────────────────────────────────────────────────────

    function init() {
        const isBookingPage = document.querySelector('.booking-wizard');
        const isAirportPage = document.querySelector('.airport-transfer-form');
        const isContactPage = document.querySelector('.contact-form');

        if (isBookingPage) {
            renderStepIndicator();
            renderStepContent();
        }

        if (isAirportPage) {
            initAirportTransferForm();
        }

        if (isContactPage) {
            initContactForm();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
