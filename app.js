// HealthFlow AI Healthcare Platform JavaScript

class HealthFlowPlatform {
    constructor() {
        this.currentRole = 'patient';
        this.currentUser = null;
        this.chartInstances = {};
        this.realTimeInterval = null;
        this.edgeMonitoringActive = false;
        this.edgeMonitoringInterval = null;
        this.alertCounter = 0;
        this.appointments = [];
        
        // Application data with updated information
        this.data = {
            users: [
                {
                    id: 1,
                    name: "Khushi Thakur",
                    role: "patient",
                    email: "khushi.t@email.com",
                    phone: "555-0123",
                    dob: "1985-06-15",
                    insurance: "BlueCross",
                    conditions: ["Hypertension", "Type 2 Diabetes"],
                    medications: ["Lisinopril 10mg", "Metformin 500mg", "Atorvastatin 20mg"],
                    allergies: ["Penicillin", "Shellfish"],
                    lastVisit: "2025-07-15",
                    nextAppointment: "2025-08-25",
                    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop&crop=face",
                    vitals: {
                        bloodPressure: "128/82",
                        heartRate: 72,
                        temperature: 98.6,
                        weight: 165,
                        height: "5'6\""
                    },
                    labResults: {
                        cholesterol: 180,
                        glucose: 145,
                        hba1c: 7.2
                    }
                },
                {
                    id: 2,
                    name: "Dr. Michael Chen",
                    role: "provider",
                    specialty: "Cardiology",
                    email: "dr.chen@hospital.com",
                    phone: "555-0456",
                    schedule: "Monday-Friday 9AM-5PM",
                    patients: 45,
                    rating: 4.9,
                    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"
                },
                {
                    id: 3,
                    name: "Dr. Emily Rodriguez",
                    role: "provider",
                    specialty: "Family Medicine",
                    email: "dr.rodriguez@hospital.com",
                    phone: "555-0789",
                    schedule: "Tuesday-Saturday 8AM-6PM",
                    patients: 52,
                    rating: 4.8,
                    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
                },
                {
                    id: 4,
                    name: "Admin User",
                    role: "admin",
                    email: "admin@healthflow.com",
                    phone: "555-0999",
                    department: "Operations",
                    clearance: "Level 5",
                    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                }
            ],
            systemMetrics: {
                uptime: 99.8,
                responseTime: 1.2,
                activeUsers: 1847,
                aiAccuracy: 97.4,
                automationRate: 82,
                patientSatisfaction: 4.6,
                costReduction: 42
            },
            healthMetrics: [
                { date: "2025-08-17", appointments: 45, efficiency: 92, satisfaction: 4.6, waitTime: 12, aiDecisions: 189 },
                { date: "2025-08-16", appointments: 52, efficiency: 89, satisfaction: 4.4, waitTime: 15, aiDecisions: 167 },
                { date: "2025-08-15", appointments: 41, efficiency: 94, satisfaction: 4.7, waitTime: 8, aiDecisions: 198 },
                { date: "2025-08-14", appointments: 48, efficiency: 91, satisfaction: 4.5, waitTime: 11, aiDecisions: 172 },
                { date: "2025-08-13", appointments: 39, efficiency: 96, satisfaction: 4.8, waitTime: 6, aiDecisions: 203 }
            ],
            schedule: [
                { time: "9:00 AM", patient: "Emma Davis", type: "Annual Physical" },
                { time: "10:00 AM", patient: "Khushi Thakur", type: "Follow-up" },
                { time: "10:30 AM", patient: "John Miller", type: "Checkup" },
                { time: "11:00 AM", patient: null, type: "Available" }
            ]
        };
        
        // Initialize appointments with existing data
        this.appointments = [
            {
                id: 1,
                date: "25",
                month: "Aug",
                provider: "Dr. Michael Chen",
                specialty: "Cardiology",
                type: "Follow-up",
                time: "10:00 AM - Room 205",
                status: "confirmed"
            },
            {
                id: 2,
                date: "02",
                month: "Sep",
                provider: "Dr. Emily Rodriguez",
                specialty: "Family Medicine",
                type: "Annual Physical",
                time: "2:30 PM - Room 101",
                status: "pending"
            }
        ];
        
        this.init();
    }

    init() {
        console.log('Initializing HealthFlow AI Platform...');
        
        // Wait for DOM to be fully ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        this.setupRoleSwitching();
        this.setupChatbot();
        this.setupAppointmentModal();
        this.setupHealthRecordModal();
        this.setupProviderFeatures();
        this.setupAdminFeatures();
        this.setupAccessibility();
        this.setupTabNavigation();
        this.setCurrentUser('patient');
        this.startRealTimeUpdates();
        
        console.log('🏥 HealthFlow AI Platform initialized successfully!');
    }

    // Role switching functionality
    setupRoleSwitching() {
        const roleSelect = document.getElementById('roleSelect');
        console.log('Setting up role switching, roleSelect element:', roleSelect);
        
        if (roleSelect) {
            roleSelect.addEventListener('change', (e) => {
                console.log('Role changed to:', e.target.value);
                this.switchRole(e.target.value);
            });
            
            roleSelect.style.pointerEvents = 'auto';
            roleSelect.disabled = false;
        }
    }

    switchRole(role) {
        console.log('Switching to role:', role);
        this.currentRole = role;
        this.setCurrentUser(role);
        this.updateMainContent();
        
        // Show appropriate dashboard
        document.querySelectorAll('.main-content').forEach(content => {
            content.classList.remove('active');
        });
        
        let targetDashboard;
        switch(role) {
            case 'patient':
                targetDashboard = document.getElementById('patientPortal');
                break;
            case 'provider':
                targetDashboard = document.getElementById('providerDashboard');
                // Initialize provider features when switching
                setTimeout(() => {
                    this.initializeProviderTabs();
                }, 100);
                break;
            case 'admin':
                targetDashboard = document.getElementById('adminConsole');
                // Initialize admin features when switching
                setTimeout(() => {
                    this.initializeAdminTabs();
                    this.initializeAdminCharts();
                }, 100);
                break;
        }
        
        if (targetDashboard) {
            targetDashboard.classList.add('active', 'fade-in');
            console.log('Switched to dashboard:', targetDashboard.id);
        } else {
            console.error('Target dashboard not found for role:', role);
        }
    }

    setCurrentUser(role) {
        this.currentUser = this.data.users.find(user => user.role === role);
        console.log('Current user set to:', this.currentUser);
        this.updateUserInfo();
    }

    updateUserInfo() {
        const userAvatar = document.getElementById('userAvatar');
        const userName = document.getElementById('userName');
        
        if (this.currentUser && userAvatar && userName) {
            userAvatar.src = this.currentUser.avatar;
            userAvatar.alt = this.currentUser.name;
            userName.textContent = this.currentUser.name;
            console.log('Updated user info for:', this.currentUser.name);
        }
    }

    updateMainContent() {
        if (this.currentRole === 'admin') {
            this.updateSystemMetrics();
        }
    }

    // Tab navigation setup
    setupTabNavigation() {
        // Provider tabs
        const providerTabs = document.querySelectorAll('.provider-nav .nav-tab');
        providerTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const tabName = tab.dataset.tab;
                this.switchProviderTab(tabName);
            });
        });

        // Admin tabs
        const adminTabs = document.querySelectorAll('.admin-nav .nav-tab');
        adminTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const tabName = tab.dataset.tab;
                this.switchAdminTab(tabName);
            });
        });
    }

    switchProviderTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.provider-nav .nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`.provider-nav [data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('#providerDashboard .tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        if (tabName === 'dashboard') {
            document.getElementById('dashboardTab').classList.add('active');
        } else if (tabName === 'edge-monitoring') {
            document.getElementById('edgeMonitoringTab').classList.add('active');
        }
    }

    switchAdminTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.admin-nav .nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`.admin-nav [data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('#adminConsole .tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        if (tabName === 'system') {
            document.getElementById('systemTab').classList.add('active');
        } else if (tabName === 'edge-monitoring') {
            document.getElementById('adminEdgeMonitoringTab').classList.add('active');
        }
    }

    initializeProviderTabs() {
        // Ensure first tab is active
        this.switchProviderTab('dashboard');
    }

    initializeAdminTabs() {
        // Ensure first tab is active
        this.switchAdminTab('system');
    }

    // Accessibility features
    setupAccessibility() {
        // High contrast toggle
        const contrastToggle = document.getElementById('contrastToggle');
        if (contrastToggle) {
            contrastToggle.addEventListener('click', () => {
                document.body.classList.toggle('high-contrast');
                const isHighContrast = document.body.classList.contains('high-contrast');
                contrastToggle.setAttribute('aria-pressed', isHighContrast);
                this.showSuccessNotification(
                    isHighContrast ? 'High contrast mode enabled' : 'High contrast mode disabled'
                );
            });
        }

        // Keyboard navigation for modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.modal:not(.hidden)');
        modals.forEach(modal => {
            modal.classList.add('hidden');
        });
        document.body.style.overflow = '';
    }

    // Chatbot functionality
    setupChatbot() {
        console.log('Setting up chatbot...');
        const chatInput = document.getElementById('chatInput');
        const chatSend = document.getElementById('chatSend');
        const quickBtns = document.querySelectorAll('.quick-btn');

        if (chatInput && chatSend) {
            chatSend.addEventListener('click', (e) => {
                e.preventDefault();
                this.sendChatMessage();
            });
            
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.sendChatMessage();
                }
            });
        }

        quickBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const action = btn.dataset.action;
                this.handleQuickAction(action);
            });
        });
    }

    sendChatMessage() {
        const chatInput = document.getElementById('chatInput');
        const message = chatInput.value.trim();
        
        if (!message) return;

        this.addChatMessage(message, 'user');
        chatInput.value = '';

        this.addTypingIndicator();
        
        setTimeout(() => {
            this.removeTypingIndicator();
            const response = this.getAIResponse(message);
            this.addChatMessage(response, 'bot');
        }, 1500);
    }

    addTypingIndicator() {
        const chatMessages = document.getElementById('chatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typingIndicator';
        
        typingDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <p>AI is thinking...</p>
            </div>
        `;
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    removeTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    addChatMessage(message, sender) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = sender === 'bot' ? '🤖' : '👤';
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        messageDiv.classList.add('fade-in');
    }

    getAIResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('headache') || lowerMessage.includes('pain')) {
            return "I understand you're experiencing headaches. On a scale of 1-10, how would you rate your pain? When did the headaches start and do you have any other symptoms like nausea or vision changes? Based on your symptoms, I recommend scheduling with Dr. Rodriguez for proper evaluation.";
        } else if (lowerMessage.includes('appointment') || lowerMessage.includes('book')) {
            return "I'd be happy to help you book an appointment! I can check availability with our providers and find the best time slot for you. Based on your medical history, you may be due for your diabetes follow-up with Dr. Chen. Would you like me to show you available times?";
        } else if (lowerMessage.includes('insurance') || lowerMessage.includes('coverage')) {
            return "I can help with insurance questions! Your current plan is BlueCross and it's active and verified. I can help you verify coverage for specific services, check prior authorization status, or find network providers. What would you like to know?";
        } else {
            return "I'm here to help with your healthcare needs! I can assist with symptom assessment, appointment booking, insurance questions, medication reminders, or general health information. What would you like to know more about?";
        }
    }

    handleQuickAction(action) {
        switch(action) {
            case 'symptoms':
                this.addChatMessage('I want to check my symptoms', 'user');
                this.addTypingIndicator();
                setTimeout(() => {
                    this.removeTypingIndicator();
                    this.addChatMessage("I can help assess your symptoms. Please describe what you're experiencing, including when it started, how severe it is (1-10 scale), and any other related symptoms. This will help me provide the best recommendations for your care.", 'bot');
                }, 1200);
                break;
                
            case 'appointment':
                this.addChatMessage('I need to book an appointment', 'user');
                this.addTypingIndicator();
                setTimeout(() => {
                    this.removeTypingIndicator();
                    this.addChatMessage("Perfect! I can help you book an appointment. Based on your recent visits, you may be due for your diabetes follow-up with Dr. Chen. I can also help you find other specialists. Let me open the booking interface for you.", 'bot');
                    setTimeout(() => this.openAppointmentModal(), 500);
                }, 1200);
                break;
                
            case 'insurance':
                this.addChatMessage('I have questions about my insurance', 'user');
                this.addTypingIndicator();
                setTimeout(() => {
                    this.removeTypingIndicator();
                    this.addChatMessage("I can help with insurance questions! Your current plan is BlueCross and it's active and verified. I can help verify coverage for specific services, check copay information, prior authorization status, or find network providers. What specific information do you need?", 'bot');
                }, 1200);
                break;
        }
    }

    // Appointment booking modal
    setupAppointmentModal() {
        const bookBtn = document.getElementById('bookAppointmentBtn');
        const modal = document.getElementById('appointmentModal');
        const closeBtn = document.getElementById('closeModal');
        const cancelBtn = document.getElementById('cancelBooking');
        const confirmBtn = document.getElementById('confirmBooking');

        console.log('Setting up appointment modal, elements:', { bookBtn, modal, closeBtn, cancelBtn, confirmBtn });

        if (bookBtn) {
            bookBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Book appointment button clicked');
                this.openAppointmentModal();
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeAppointmentModal();
            });
        }
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeAppointmentModal();
            });
        }
        
        if (confirmBtn) {
            confirmBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.confirmAppointment();
            });
        }

        // Provider selection
        document.querySelectorAll('.provider-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.provider-option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
            });
        });

        // Time slot selection
        document.querySelectorAll('.time-suggestion').forEach(suggestion => {
            suggestion.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.time-suggestion').forEach(sug => sug.classList.remove('selected'));
                suggestion.classList.add('selected');
            });
        });

        // Close modal when clicking overlay
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target.classList.contains('modal-overlay')) {
                    this.closeAppointmentModal();
                }
            });
        }
    }

    openAppointmentModal() {
        console.log('Opening appointment modal...');
        const modal = document.getElementById('appointmentModal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            console.log('Appointment modal opened');
        } else {
            console.error('Appointment modal not found');
        }
    }

    closeAppointmentModal() {
        console.log('Closing appointment modal...');
        const modal = document.getElementById('appointmentModal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
            
            // Reset selections
            document.querySelectorAll('.provider-option').forEach(opt => opt.classList.remove('selected'));
            document.querySelectorAll('.time-suggestion').forEach(sug => sug.classList.remove('selected'));
            console.log('Appointment modal closed');
        }
    }

    confirmAppointment() {
        const selectedProvider = document.querySelector('.provider-option.selected');
        const selectedTime = document.querySelector('.time-suggestion.selected');
        const appointmentReason = document.getElementById('appointmentReason');

        console.log('Confirming appointment:', { selectedProvider, selectedTime, appointmentReason });

        if (!selectedProvider || !selectedTime) {
            this.showErrorNotification('Please select both a provider and time slot.');
            return;
        }

        const providerName = selectedProvider.querySelector('h4').textContent;
        const specialty = selectedProvider.querySelector('p').textContent;
        const timeSlot = selectedTime.dataset.time || selectedTime.querySelector('.suggestion-time').textContent;
        const reason = appointmentReason ? appointmentReason.value : 'Follow-up appointment';

        // Create new appointment
        const newAppointment = {
            id: this.appointments.length + 1,
            date: timeSlot.split(',')[0].split(' ')[1] || "20",
            month: timeSlot.split(',')[0].split(' ')[0] || "Aug",
            provider: providerName,
            specialty: specialty,
            type: reason,
            time: timeSlot.includes(',') ? timeSlot.split(',')[1].trim() + ' - TBD' : timeSlot + ' - TBD',
            status: 'confirmed'
        };

        // Add to appointments array
        this.appointments.push(newAppointment);
        console.log('New appointment added:', newAppointment);
        
        // Update the appointments display
        this.updateAppointmentsList();

        // Show success message
        this.showSuccessNotification(`Appointment confirmed with ${providerName} for ${timeSlot}!`);
        
        // Close modal
        this.closeAppointmentModal();

        // Add to chatbot
        setTimeout(() => {
            this.addChatMessage(`Excellent! Your appointment with ${providerName} is confirmed for ${timeSlot}. You'll receive a confirmation email and SMS reminder 24 hours before your visit. Your appointment has been added to your appointments list.`, 'bot');
        }, 1000);
    }

    updateAppointmentsList() {
        const appointmentsList = document.getElementById('appointmentsList');
        console.log('Updating appointments list, element:', appointmentsList);
        if (!appointmentsList) return;

        appointmentsList.innerHTML = '';
        
        this.appointments.forEach(appointment => {
            const statusClass = appointment.status === 'confirmed' ? 'upcoming' : 'pending';
            const statusText = appointment.status === 'confirmed' ? 'Confirmed' : 'Pending';
            const statusColor = appointment.status === 'confirmed' ? 'success' : 'warning';
            
            const appointmentDiv = document.createElement('div');
            appointmentDiv.className = `appointment-item ${statusClass}`;
            appointmentDiv.innerHTML = `
                <div class="appointment-date">
                    <span class="date-day">${appointment.date}</span>
                    <span class="date-month">${appointment.month}</span>
                </div>
                <div class="appointment-details">
                    <h4>${appointment.provider}</h4>
                    <p>${appointment.specialty} • ${appointment.type}</p>
                    <p class="appointment-time">${appointment.time}</p>
                </div>
                <div class="appointment-status">
                    <span class="status status--${statusColor}">${statusText}</span>
                </div>
            `;
            appointmentsList.appendChild(appointmentDiv);
        });
        console.log('Appointments list updated with', this.appointments.length, 'appointments');
    }

    // Health record modal
    setupHealthRecordModal() {
        const viewRecordBtn = document.getElementById('viewFullRecordBtn');
        const modal = document.getElementById('healthRecordModal');
        const closeBtn = document.getElementById('closeHealthRecord');
        const closeFooterBtn = document.getElementById('closeHealthRecordBtn');

        console.log('Setting up health record modal, elements:', { viewRecordBtn, modal });

        if (viewRecordBtn) {
            viewRecordBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('View Full Record button clicked');
                this.openHealthRecordModal();
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeHealthRecordModal();
            });
        }
        
        if (closeFooterBtn) {
            closeFooterBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeHealthRecordModal();
            });
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target.classList.contains('modal-overlay')) {
                    this.closeHealthRecordModal();
                }
            });
        }
    }

    openHealthRecordModal() {
        console.log('Opening health record modal...');
        const modal = document.getElementById('healthRecordModal');
        const content = document.getElementById('healthRecordContent');
        
        if (modal && content) {
            // Generate comprehensive health record
            const patientData = this.data.users[0]; // Khushi Thakur
            const healthRecord = {
                "Patient Information": {
                    "Name": patientData.name,
                    "Date of Birth": patientData.dob,
                    "Phone": patientData.phone,
                    "Email": patientData.email,
                    "Insurance": patientData.insurance
                },
                "Demographics": {
                    "Age": "39 years",
                    "Gender": "Female",
                    "Marital Status": "Married",
                    "Emergency Contact": "Spouse - 555-0124"
                },
                "Active Conditions": patientData.conditions,
                "Current Medications": patientData.medications,
                "Known Allergies": patientData.allergies,
                "Vital Signs (Last Visit)": patientData.vitals,
                "Recent Lab Results": patientData.labResults,
                "Appointment History": [
                    "2025-07-15: Follow-up visit with Dr. Chen",
                    "2025-06-01: Annual physical with Dr. Rodriguez",
                    "2025-04-12: Diabetes management consultation"
                ],
                "Clinical Notes": [
                    "Patient shows good compliance with medications",
                    "Blood pressure trending upward - monitor closely",
                    "HbA1c slightly elevated - dietary counseling recommended"
                ],
                "Care Plan": [
                    "Continue current BP medication with monitoring",
                    "Diabetes education and lifestyle counseling",
                    "Follow-up in 3 months or sooner if symptoms worsen"
                ]
            };

            content.textContent = JSON.stringify(healthRecord, null, 2);
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            console.log('Health record modal opened');
        } else {
            console.error('Health record modal elements not found:', { modal, content });
        }
    }

    closeHealthRecordModal() {
        console.log('Closing health record modal...');
        const modal = document.getElementById('healthRecordModal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    // Provider dashboard features
    setupProviderFeatures() {
        const optimizeBtn = document.getElementById('optimizeSchedule');
        if (optimizeBtn) {
            optimizeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.optimizeSchedule();
            });
        }

        // John Miller chart button
        const viewChartBtn = document.getElementById('viewJohnChart');
        if (viewChartBtn) {
            viewChartBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openJohnChartModal();
            });
        }

        // Medication review button
        const reviewDetailsBtn = document.getElementById('reviewDetailsBtn');
        if (reviewDetailsBtn) {
            reviewDetailsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openMedicationModal();
            });
        }

        // Apply suggestion button
        const applySuggestionBtn = document.getElementById('applySuggestionBtn');
        if (applySuggestionBtn) {
            applySuggestionBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.applySuggestion();
            });
        }

        // Edge monitoring controls
        const startBtn = document.getElementById('startMonitoring');
        const stopBtn = document.getElementById('stopMonitoring');
        
        if (startBtn) {
            startBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.startEdgeMonitoring();
            });
        }
        
        if (stopBtn) {
            stopBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.stopEdgeMonitoring();
            });
        }

        // Start visit buttons
        document.querySelectorAll('.queue-item .btn--primary').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const patientName = e.target.closest('.queue-item').querySelector('h4').textContent;
                this.startPatientVisit(patientName);
            });
        });

        // Setup modals
        this.setupJohnChartModal();
        this.setupMedicationModal();
    }

    setupJohnChartModal() {
        const modal = document.getElementById('johnChartModal');
        const closeBtn = document.getElementById('closeJohnChart');
        const closeFooterBtn = document.getElementById('closeJohnChartBtn');

        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeJohnChartModal();
            });
        }
        
        if (closeFooterBtn) {
            closeFooterBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeJohnChartModal();
            });
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target.classList.contains('modal-overlay')) {
                    this.closeJohnChartModal();
                }
            });
        }
    }

    openJohnChartModal() {
        console.log('Opening John Miller chart modal...');
        const modal = document.getElementById('johnChartModal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Initialize chart after modal is visible
            setTimeout(() => {
                this.initializeJohnChart();
            }, 100);
            console.log('John Miller chart modal opened');
        } else {
            console.error('John Miller chart modal not found');
        }
    }

    closeJohnChartModal() {
        console.log('Closing John Miller chart modal...');
        const modal = document.getElementById('johnChartModal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
            
            // Destroy chart instance
            if (this.chartInstances.johnChart) {
                this.chartInstances.johnChart.destroy();
                delete this.chartInstances.johnChart;
            }
        }
    }

    initializeJohnChart() {
        const chartCanvas = document.getElementById('johnMillerChart');
        console.log('Initializing John Miller chart, canvas:', chartCanvas);
        
        if (!chartCanvas) {
            console.error('John Miller chart canvas not found');
            return;
        }

        if (this.chartInstances.johnChart) {
            this.chartInstances.johnChart.destroy();
        }

        try {
            const ctx = chartCanvas.getContext('2d');
            
            this.chartInstances.johnChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [
                        {
                            label: 'Blood Pressure (Systolic)',
                            data: [125, 128, 122, 130, 126, 124],
                            borderColor: '#1FB8CD',
                            backgroundColor: 'rgba(31, 184, 205, 0.1)',
                            tension: 0.4,
                            fill: true
                        },
                        {
                            label: 'Cholesterol',
                            data: [190, 185, 180, 175, 178, 172],
                            borderColor: '#FFC185',
                            backgroundColor: 'rgba(255, 193, 133, 0.1)',
                            tension: 0.4,
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top'
                        },
                        title: {
                            display: true,
                            text: 'John Miller - Health Trends (6 months)'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            title: {
                                display: true,
                                text: 'Values'
                            }
                        }
                    }
                }
            });
            console.log('John Miller chart initialized successfully');
        } catch (error) {
            console.error('Error initializing John Miller chart:', error);
        }
    }

    setupMedicationModal() {
        const modal = document.getElementById('medicationModal');
        const closeBtn = document.getElementById('closeMedication');
        const closeFooterBtn = document.getElementById('closeMedicationBtn');
        const updateBtn = document.getElementById('updateMedication');

        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeMedicationModal();
            });
        }
        
        if (closeFooterBtn) {
            closeFooterBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeMedicationModal();
            });
        }
        
        if (updateBtn) {
            updateBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.updateMedications();
            });
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target.classList.contains('modal-overlay')) {
                    this.closeMedicationModal();
                }
            });
        }
    }

    openMedicationModal() {
        console.log('Opening medication modal...');
        const modal = document.getElementById('medicationModal');
        const content = document.getElementById('medicationContent');
        
        if (modal && content) {
            content.innerHTML = `
                <div class="medication-interaction">
                    <h4>High Priority Interaction Detected</h4>
                    <p><strong>Patient:</strong> Khushi Thakur</p>
                    <p><strong>Interacting Medications:</strong></p>
                    <ul class="medication-list">
                        <li><strong>Lisinopril 10mg</strong> (ACE Inhibitor)</li>
                        <li><strong>Atorvastatin 20mg</strong> (Statin)</li>
                    </ul>
                    <p><strong>Interaction Type:</strong> <span class="severity-high">Moderate Risk</span></p>
                    <p><strong>Clinical Significance:</strong> Potential increased risk of muscle-related side effects when used together.</p>
                    <p><strong>Recommendation:</strong> Monitor patient for muscle pain, weakness, or elevated CK levels. Consider dose adjustment or alternative statin if symptoms occur.</p>
                    <p><strong>Action Required:</strong> Schedule follow-up in 2 weeks to assess for muscle symptoms.</p>
                </div>
                <div class="medication-interaction">
                    <h4>Current Medication List</h4>
                    <ul class="medication-list">
                        <li>Lisinopril 10mg - Once daily for hypertension</li>
                        <li>Metformin 500mg - Twice daily for diabetes</li>
                        <li>Atorvastatin 20mg - Once daily for cholesterol</li>
                    </ul>
                </div>
            `;
            
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            console.log('Medication modal opened');
        } else {
            console.error('Medication modal elements not found:', { modal, content });
        }
    }

    closeMedicationModal() {
        console.log('Closing medication modal...');
        const modal = document.getElementById('medicationModal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    updateMedications() {
        this.showSuccessNotification('Medication review completed. Patient flagged for follow-up monitoring.');
        this.closeMedicationModal();
    }

    applySuggestion() {
        const btn = document.getElementById('applySuggestionBtn');
        if (btn) {
            const originalText = btn.textContent;
            btn.textContent = 'Applying...';
            btn.disabled = true;

            setTimeout(() => {
                // Update schedule
                this.data.schedule[1] = { time: "1:30 PM", patient: "Khushi Thakur", type: "Follow-up" };
                this.data.schedule.push({ time: "2:00 PM", patient: "Available Slot", type: "Available" });
                
                this.updateScheduleDisplay();
                
                btn.textContent = 'Applied ✓';
                btn.disabled = false;
                
                this.showSuccessNotification('Scheduling suggestion applied! 2:00 PM slot optimized for better workflow efficiency.');
                
                setTimeout(() => {
                    btn.textContent = originalText;
                }, 3000);
            }, 1500);
        }
    }

    updateScheduleDisplay() {
        const timeSlots = document.getElementById('timeSlots');
        if (timeSlots) {
            timeSlots.innerHTML = '';
            
            this.data.schedule.forEach((slot, index) => {
                const slotDiv = document.createElement('div');
                let slotClass = 'time-slot';
                
                if (slot.patient && slot.patient !== 'Available Slot') {
                    slotClass += ' occupied';
                    if (slot.patient === 'Khushi Thakur') {
                        slotClass += ' current';
                    }
                } else {
                    slotClass += ' available';
                }
                
                slotDiv.className = slotClass;
                slotDiv.innerHTML = `
                    <span class="slot-time">${slot.time}</span>
                    <div class="slot-content">
                        ${slot.patient && slot.patient !== 'Available Slot' ? 
                            `<span class="patient-name">${slot.patient}</span>
                             <span class="visit-type">${slot.type}</span>` :
                            `<span class="slot-status">Available</span>`
                        }
                    </div>
                `;
                
                timeSlots.appendChild(slotDiv);
            });
        }
    }

    // Edge Monitoring functionality
    startEdgeMonitoring() {
        console.log('Starting edge monitoring...');
        this.edgeMonitoringActive = true;
        
        const statusEl = document.getElementById('monitoringStatus');
        if (statusEl) {
            statusEl.textContent = 'Active';
            statusEl.className = 'status status--success';
        }

        this.showSuccessNotification('Edge monitoring started. Real-time vital signs streaming...');
        
        // Start monitoring interval
        this.edgeMonitoringInterval = setInterval(() => {
            this.updateVitalSigns();
        }, 1000);
    }

    stopEdgeMonitoring() {
        console.log('Stopping edge monitoring...');
        this.edgeMonitoringActive = false;
        
        const statusEl = document.getElementById('monitoringStatus');
        if (statusEl) {
            statusEl.textContent = 'Stopped';
            statusEl.className = 'status status--info';
        }

        if (this.edgeMonitoringInterval) {
            clearInterval(this.edgeMonitoringInterval);
            this.edgeMonitoringInterval = null;
        }

        // Reset vital displays
        ['khushi', 'john', 'emma'].forEach(patient => {
            const hrEl = document.getElementById(`hr-${patient}`);
            const spo2El = document.getElementById(`spo2-${patient}`);
            const bpEl = document.getElementById(`bp-${patient}`);
            
            if (hrEl) hrEl.textContent = '--';
            if (spo2El) spo2El.textContent = '--';
            if (bpEl) bpEl.textContent = '--/--';
        });

        this.showSuccessNotification('Edge monitoring stopped.');
    }

    updateVitalSigns() {
        if (!this.edgeMonitoringActive) return;

        const patients = [
            { 
                id: 'khushi', 
                name: 'Khushi Thakur',
                baseHR: 75, 
                baseSpo2: 98, 
                baseBP: { sys: 128, dia: 82 }
            },
            { 
                id: 'john', 
                name: 'John Miller',
                baseHR: 68, 
                baseSpo2: 99, 
                baseBP: { sys: 120, dia: 75 }
            },
            { 
                id: 'emma', 
                name: 'Emma Davis',
                baseHR: 72, 
                baseSpo2: 97, 
                baseBP: { sys: 115, dia: 70 }
            }
        ];

        patients.forEach(patient => {
            // Generate realistic vital signs with some variation
            const hr = patient.baseHR + Math.floor(Math.random() * 20 - 10);
            const spo2 = Math.max(85, patient.baseSpo2 + Math.floor(Math.random() * 6 - 3));
            const sysBP = patient.baseBP.sys + Math.floor(Math.random() * 20 - 10);
            const diaBP = patient.baseBP.dia + Math.floor(Math.random() * 15 - 7);

            // Update displays
            const hrEl = document.getElementById(`hr-${patient.id}`);
            const spo2El = document.getElementById(`spo2-${patient.id}`);
            const bpEl = document.getElementById(`bp-${patient.id}`);

            if (hrEl) {
                hrEl.textContent = hr;
                hrEl.className = 'vital-value';
                if (hr > 120 || hr < 50) {
                    hrEl.classList.add('critical');
                } else if (hr > 100 || hr < 60) {
                    hrEl.classList.add('warning');
                }
            }

            if (spo2El) {
                spo2El.textContent = spo2;
                spo2El.className = 'vital-value';
                if (spo2 < 90) {
                    spo2El.classList.add('critical');
                } else if (spo2 < 95) {
                    spo2El.classList.add('warning');
                }
            }

            if (bpEl) {
                bpEl.textContent = `${sysBP}/${diaBP}`;
                bpEl.className = 'vital-value';
                if (sysBP > 180 || sysBP < 90) {
                    bpEl.classList.add('critical');
                } else if (sysBP > 140 || sysBP < 100) {
                    bpEl.classList.add('warning');
                }
            }

            // Check for anomalies and create alerts
            this.checkForAnomalies(patient.name, hr, spo2, sysBP, diaBP);
        });

        // Update admin metrics if in admin view
        this.updateEdgeMetrics();
    }

    checkForAnomalies(patientName, hr, spo2, sysBP, diaBP) {
        const alerts = [];
        
        if (hr > 120) {
            alerts.push({
                type: 'Tachycardia',
                message: `Heart rate elevated: ${hr} bpm`,
                severity: 'critical'
            });
        } else if (hr < 50) {
            alerts.push({
                type: 'Bradycardia',
                message: `Heart rate low: ${hr} bpm`,
                severity: 'critical'
            });
        }
        
        if (spo2 < 90) {
            alerts.push({
                type: 'Hypoxia',
                message: `Oxygen saturation low: ${spo2}%`,
                severity: 'critical'
            });
        }
        
        if (sysBP > 180) {
            alerts.push({
                type: 'Hypertensive Crisis',
                message: `Blood pressure critical: ${sysBP}/${diaBP} mmHg`,
                severity: 'critical'
            });
        }

        alerts.forEach(alert => {
            this.createEdgeAlert(patientName, alert);
        });
    }

    createEdgeAlert(patientName, alert) {
        const alertsList = document.getElementById('edgeAlertsList');
        const alertCounter = document.getElementById('alertCount');
        
        if (!alertsList) return;

        // Remove "no alerts" message if it exists
        const noAlerts = alertsList.querySelector('.no-alerts');
        if (noAlerts) {
            noAlerts.remove();
        }

        // Create alert element
        const alertDiv = document.createElement('div');
        alertDiv.className = 'edge-alert-item';
        alertDiv.innerHTML = `
            <div class="edge-alert-icon">⚠️</div>
            <div class="edge-alert-content">
                <h5>${alert.type} - ${patientName}</h5>
                <p>${alert.message}</p>
            </div>
            <div class="edge-alert-time">${new Date().toLocaleTimeString()}</div>
        `;

        alertsList.insertBefore(alertDiv, alertsList.firstChild);
        
        // Update counter
        this.alertCounter++;
        if (alertCounter) {
            alertCounter.textContent = `${this.alertCounter} alerts`;
        }

        // Show toast notification
        this.showErrorNotification(`${alert.type}: ${patientName} - ${alert.message}`);

        // Highlight patient card
        const patientCard = document.querySelector(`[data-patient="${patientName.toLowerCase().split(' ')[0]}"]`);
        if (patientCard) {
            patientCard.classList.add('alert');
            setTimeout(() => {
                patientCard.classList.remove('alert');
            }, 5000);
        }

        // Remove old alerts (keep last 10)
        const allAlerts = alertsList.querySelectorAll('.edge-alert-item');
        if (allAlerts.length > 10) {
            allAlerts[allAlerts.length - 1].remove();
        }
    }

    updateEdgeMetrics() {
        const connectedDevices = document.getElementById('connectedDevices');
        const activeAlerts = document.getElementById('activeAlerts');
        const dataPoints = document.getElementById('dataPoints');

        if (connectedDevices) {
            connectedDevices.textContent = this.edgeMonitoringActive ? '3' : '0';
        }
        
        if (activeAlerts) {
            activeAlerts.textContent = this.alertCounter;
        }
        
        if (dataPoints) {
            dataPoints.textContent = this.edgeMonitoringActive ? '180' : '0';
        }
    }

    optimizeSchedule() {
        const btn = document.getElementById('optimizeSchedule');
        if (btn) {
            const originalText = btn.textContent;
            btn.textContent = 'Optimizing...';
            btn.classList.add('loading');
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = 'AI Optimized ✓';
                btn.classList.remove('loading');
                btn.disabled = false;
                
                this.showSuccessNotification('Schedule optimized! AI rearranged 3 appointments for 15% better efficiency and reduced patient wait times.');
                
                setTimeout(() => {
                    btn.textContent = originalText;
                }, 3000);
                
                this.updateScheduleView();
            }, 2500);
        }
    }

    startPatientVisit(patientName) {
        this.showSuccessNotification(`Starting visit with ${patientName}. Patient chart loaded with AI insights and clinical recommendations.`);
    }

    updateScheduleView() {
        const timeSlots = document.querySelectorAll('.time-slot');
        timeSlots.forEach((slot, index) => {
            if (index === 2) {
                slot.classList.add('fade-in', 'pulse');
                setTimeout(() => {
                    slot.classList.remove('pulse');
                }, 2000);
            }
        });
    }

    // Admin dashboard features
    setupAdminFeatures() {
        // Admin features will be initialized when switching to admin role
        console.log('Admin features setup completed');
    }

    initializeAdminCharts() {
        console.log('Initializing admin charts...');
        const chartCanvas = document.getElementById('systemMetricsChart');
        
        if (!chartCanvas) {
            console.error('Chart canvas not found');
            return;
        }
        
        if (this.chartInstances.systemMetrics) {
            this.chartInstances.systemMetrics.destroy();
        }
        
        try {
            const ctx = chartCanvas.getContext('2d');
            
            this.chartInstances.systemMetrics = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: this.data.healthMetrics.map(metric => {
                        const date = new Date(metric.date);
                        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    }),
                    datasets: [
                        {
                            label: 'System Efficiency (%)',
                            data: this.data.healthMetrics.map(metric => metric.efficiency),
                            borderColor: '#1FB8CD',
                            backgroundColor: 'rgba(31, 184, 205, 0.1)',
                            tension: 0.4,
                            fill: true
                        },
                        {
                            label: 'Patient Satisfaction (×20)',
                            data: this.data.healthMetrics.map(metric => metric.satisfaction * 20),
                            borderColor: '#FFC185',
                            backgroundColor: 'rgba(255, 193, 133, 0.1)',
                            tension: 0.4,
                            fill: true
                        },
                        {
                            label: 'AI Decisions (÷2)',
                            data: this.data.healthMetrics.map(metric => metric.aiDecisions / 2),
                            borderColor: '#B4413C',
                            backgroundColor: 'rgba(180, 65, 60, 0.1)',
                            tension: 0.4,
                            fill: false
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                usePointStyle: true,
                                padding: 20
                            }
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    },
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Date'
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Performance Metrics'
                            },
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    },
                    interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                    }
                }
            });
            console.log('Admin chart initialized successfully');
        } catch (error) {
            console.error('Error initializing admin chart:', error);
        }
    }

    // Real-time updates
    startRealTimeUpdates() {
        this.realTimeInterval = setInterval(() => {
            this.updateRealTimeMetrics();
        }, 5000);
    }

    updateRealTimeMetrics() {
        if (this.currentRole !== 'admin') return;
        
        const metrics = this.data.systemMetrics;
        
        // Small random variations
        const variations = {
            activeUsers: Math.floor(Math.random() * 20 - 10),
            aiAccuracy: (Math.random() - 0.5) * 0.3
        };
        
        metrics.activeUsers = Math.max(1800, Math.min(1900, metrics.activeUsers + variations.activeUsers));
        metrics.aiAccuracy = Math.max(95, Math.min(98, metrics.aiAccuracy + variations.aiAccuracy));
        
        // Update UI elements
        const activeUsersEl = document.getElementById('activeUsers');
        const aiAccuracyEl = document.getElementById('aiAccuracy');
        
        if (activeUsersEl) {
            activeUsersEl.textContent = metrics.activeUsers.toLocaleString();
            activeUsersEl.classList.add('pulse');
            setTimeout(() => activeUsersEl.classList.remove('pulse'), 1000);
        }
        
        if (aiAccuracyEl) {
            aiAccuracyEl.textContent = metrics.aiAccuracy.toFixed(1) + '%';
        }
    }

    updateSystemMetrics() {
        const metrics = this.data.systemMetrics;
        
        const activeUsersEl = document.getElementById('activeUsers');
        const systemUptimeEl = document.getElementById('systemUptime');
        const aiAccuracyEl = document.getElementById('aiAccuracy');
        const appointmentsTodayEl = document.getElementById('appointmentsToday');
        
        if (activeUsersEl) activeUsersEl.textContent = metrics.activeUsers.toLocaleString();
        if (systemUptimeEl) systemUptimeEl.textContent = metrics.uptime + '%';
        if (aiAccuracyEl) aiAccuracyEl.textContent = metrics.aiAccuracy.toFixed(1) + '%';
        if (appointmentsTodayEl) appointmentsTodayEl.textContent = '45';
    }

    // Utility functions
    showSuccessNotification(message) {
        this.createNotification(message, 'success');
    }

    showErrorNotification(message) {
        this.createNotification(message, 'error');
    }

    createNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `${type}-notification`;
        
        const icon = type === 'success' ? '✅' : '❌';
        const borderColor = type === 'success' ? 'var(--color-success)' : 'var(--color-error)';
        
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${icon}</span>
                <span class="notification-message">${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-surface);
            border: 2px solid ${borderColor};
            border-radius: var(--radius-lg);
            padding: var(--space-16);
            box-shadow: var(--shadow-lg);
            z-index: 2000;
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, 4000);
    }

    destroy() {
        if (this.realTimeInterval) {
            clearInterval(this.realTimeInterval);
        }
        
        if (this.edgeMonitoringInterval) {
            clearInterval(this.edgeMonitoringInterval);
        }
        
        Object.values(this.chartInstances).forEach(chart => {
            if (chart && typeof chart.destroy === 'function') {
                chart.destroy();
            }
        });
    }
}

// Add CSS for notifications and animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .success-notification,
    .error-notification {
        font-family: var(--font-family-base);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: var(--space-12);
    }
    
    .notification-icon {
        font-size: var(--font-size-lg);
        flex-shrink: 0;
    }
    
    .notification-message {
        color: var(--color-text);
        font-size: var(--font-size-sm);
        line-height: 1.4;
    }
    
    .typing-indicator .message-content {
        font-style: italic;
        opacity: 0.8;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing HealthFlow platform...');
    window.healthFlowPlatform = new HealthFlowPlatform();
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    document.getElementById('roleSelect').value = 'patient';
                    window.healthFlowPlatform.switchRole('patient');
                    break;
                case '2':
                    e.preventDefault();
                    document.getElementById('roleSelect').value = 'provider';
                    window.healthFlowPlatform.switchRole('provider');
                    break;
                case '3':
                    e.preventDefault();
                    document.getElementById('roleSelect').value = 'admin';
                    window.healthFlowPlatform.switchRole('admin');
                    break;
                case 'b':
                    e.preventDefault();
                    if (window.healthFlowPlatform.currentRole === 'patient') {
                        window.healthFlowPlatform.openAppointmentModal();
                    }
                    break;
            }
        }
        
        if (e.key === 'Escape') {
            window.healthFlowPlatform.closeAllModals();
        }
    });
    
    console.log('🚀 HealthFlow AI Platform ready!');
    console.log('💡 Keyboard shortcuts: Ctrl+1/2/3 for role switching, Ctrl+B for booking, Esc to close modals');
});

// Handle page visibility for performance
document.addEventListener('visibilitychange', () => {
    if (window.healthFlowPlatform) {
        if (document.hidden) {
            if (window.healthFlowPlatform.realTimeInterval) {
                clearInterval(window.healthFlowPlatform.realTimeInterval);
            }
            if (window.healthFlowPlatform.edgeMonitoringInterval) {
                clearInterval(window.healthFlowPlatform.edgeMonitoringInterval);
            }
        } else {
            window.healthFlowPlatform.startRealTimeUpdates();
            if (window.healthFlowPlatform.edgeMonitoringActive) {
                window.healthFlowPlatform.startEdgeMonitoring();
            }
        }
    }
});

// Cleanup
window.addEventListener('beforeunload', () => {
    if (window.healthFlowPlatform) {
        window.healthFlowPlatform.destroy();
    }
});