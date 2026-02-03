// Circular Journey Interactions - Simplified
(function() {
    'use strict';
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        console.log('Initializing journey interactions...');
        
        // Loop card expand/collapse
        const loopCards = document.querySelectorAll('.loop-card');
        console.log('Found ' + loopCards.length + ' loop cards');
        
        loopCards.forEach(function(card, index) {
            card.style.cursor = 'pointer';
            
            card.onclick = function(e) {
                // Don't toggle if clicking on a stage
                if (e.target.closest('.stage')) {
                    return;
                }
                
                console.log('Card ' + (index + 1) + ' clicked');
                
                // Close all other cards
                loopCards.forEach(function(c) {
                    if (c !== card) {
                        c.classList.remove('expanded');
                    }
                });
                
                // Toggle this card
                card.classList.toggle('expanded');
                console.log('Card expanded:', card.classList.contains('expanded'));
            };
        });
        
        // Stage click handlers for modal
        const stages = document.querySelectorAll('.stage');
        console.log('Found ' + stages.length + ' stages');
        
        stages.forEach(function(stage) {
            stage.style.cursor = 'pointer';
            
            stage.onclick = function(e) {
                e.stopPropagation();
                var stageId = this.getAttribute('data-stage');
                console.log('Stage clicked:', stageId);
                openModal(stageId);
            };
        });
        
        // Modal close handlers
        var modal = document.getElementById('stageModal');
        var modalClose = document.getElementById('modalClose');
        var modalOverlay = modal ? modal.querySelector('.modal-overlay') : null;
        
        if (modalClose) {
            modalClose.onclick = closeModal;
        }
        
        if (modalOverlay) {
            modalOverlay.onclick = closeModal;
        }
        
        document.onkeydown = function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        };
        
        console.log('Journey interactions initialized!');
    }
    
    function openModal(stageId) {
        var stageData = getStageData(stageId);
        var modal = document.getElementById('stageModal');
        
        if (!stageData || !modal) {
            console.log('Modal or stage data not found');
            return;
        }
        
        document.getElementById('modalStageNumber').textContent = stageData.number;
        document.getElementById('modalTitle').textContent = stageData.title;
        document.getElementById('modalSubtitle').textContent = stageData.subtitle;
        document.getElementById('modalBody').innerHTML = stageData.content;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        var modal = document.getElementById('stageModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Stage data with sources
    function getStageData(stageId) {
        var data = {
            // Simulation Loop
            'sim-setup': {
                number: '1',
                title: 'Simulation Setup',
                subtitle: 'Build your simulation environment',
                content: '<div class="modal-section"><p class="modal-section-title">NVIDIA Tools</p><div class="modal-tool"><h4>Isaac Sim 6.0</h4><p>Physically-based simulation built on Omniverse. Create photorealistic environments with accurate physics.</p><a href="https://developer.nvidia.com/isaac-sim" target="_blank" class="source-link">→ Documentation</a></div><div class="modal-tool"><h4>Omniverse Kit</h4><p>Build custom simulation applications and extensions.</p><a href="https://developer.nvidia.com/omniverse" target="_blank" class="source-link">→ Documentation</a></div></div><div class="modal-section"><p class="modal-section-title">PM Decision Points</p><p>• How complex are your environments?<br>• Do you need photorealistic rendering?<br>• What\'s your team\'s USD experience?</p></div>'
            },
            'sim-train': {
                number: '2',
                title: 'Training',
                subtitle: 'Train policies in simulation',
                content: '<div class="modal-section"><p class="modal-section-title">NVIDIA Tools</p><div class="modal-tool"><h4>Isaac Lab</h4><p>Modular framework for robot learning. Supports RL, IL, and hybrid approaches.</p><a href="https://isaac-sim.github.io/IsaacLab/" target="_blank" class="source-link">→ Documentation</a></div><div class="modal-tool"><h4>Newton Physics Engine</h4><p>GPU-accelerated physics with Google DeepMind & Disney Research.</p><a href="https://github.com/newton-physics/newton" target="_blank" class="source-link">→ GitHub</a></div></div><div class="modal-section"><p class="modal-section-title">PM Decision Points</p><p>• RL vs IL vs hybrid approach?<br>• How many parallel environments needed?<br>• What\'s your compute budget?</p></div>'
            },
            'sim-eval': {
                number: '3',
                title: 'Evaluation',
                subtitle: 'Benchmark your policies',
                content: '<div class="modal-section"><p class="modal-section-title">NVIDIA Tools</p><div class="modal-tool"><h4>Isaac Lab-Arena</h4><p>Generalist robot policy evaluation at scale. Standardized benchmarks for comparison.</p><a href="https://github.com/isaac-sim/IsaacLab-Arena" target="_blank" class="source-link">→ GitHub</a></div></div><div class="modal-section"><p class="modal-section-title">PM Decision Points</p><p>• What metrics matter for your use case?<br>• How do you compare against baselines?<br>• When is "good enough" for real-world testing?</p></div>'
            },
            
            // Data Loop
            'data-collect': {
                number: '1',
                title: 'Data Collection',
                subtitle: 'Gather training data',
                content: '<div class="modal-section"><p class="modal-section-title">Collection Paradigms</p><div class="modal-tool"><h4>Hand/Arm Manipulation</h4><p>Glasses/VR + UMI Device or Gloves. Fast collection at human speed.</p></div><div class="modal-tool"><h4>Whole-Body MoCap</h4><p>MoCap Suit + Gloves/Gripper. For humanoid data collection.</p></div><div class="modal-tool"><h4>Robot Teleoperation</h4><p>Direct robot control. Slow but no retargeting needed.</p></div></div><div class="modal-section"><p class="modal-section-title">NVIDIA Tools</p><div class="modal-tool"><h4>GR00T-Mimic</h4><p>Retarget human motion to robot embodiment.</p><a href="https://research.nvidia.com/labs/gear/gr00t-n1_6/" target="_blank" class="source-link">→ GR00T N1.6 Research</a></div></div>'
            },
            'data-augment': {
                number: '2',
                title: 'Data Augmentation',
                subtitle: 'Expand and enhance your dataset',
                content: '<div class="modal-section"><p class="modal-section-title">NVIDIA Tools</p><div class="modal-tool"><h4>Cosmos Transfer 2.5</h4><p>Transform 3D/spatial inputs from simulators into high-fidelity video for domain transfer.</p><a href="https://www.nvidia.com/en-us/ai/cosmos/" target="_blank" class="source-link">→ Cosmos Platform</a></div><div class="modal-tool"><h4>NuRec</h4><p>Neural reconstruction for robotic space interaction.</p><a href="https://docs.nvidia.com/nurec/index.html#" target="_blank" class="source-link">→ NuRec Documentation</a></div></div><div class="modal-section"><p class="modal-section-title">PM Decision Points</p><p>• How much real data do you have?<br>• What variations do you need?<br>• Domain randomization vs. domain transfer?</p></div>'
            },
            
            // VLA Training Loop
            'vla-pretrain': {
                number: '1',
                title: 'Pretraining',
                subtitle: 'Build foundation VLA models',
                content: '<div class="modal-section"><p class="modal-section-title">NVIDIA Tools</p><div class="modal-tool"><h4>NeMo Framework</h4><p>End-to-end platform for building, customizing, and deploying generative AI models.</p><a href="https://www.nvidia.com/en-us/ai-data-science/products/nemo/" target="_blank" class="source-link">→ NeMo Platform</a></div><div class="modal-tool"><h4>GR00T N1.6</h4><p>Foundation model for humanoid robots. Cross-embodiment generalization.</p><a href="https://research.nvidia.com/labs/gear/gr00t-n1_6/" target="_blank" class="source-link">→ GR00T N1.6 Research</a></div></div><div class="modal-section"><p class="modal-section-title">PM Decision Points</p><p>• Train from scratch or fine-tune existing?<br>• What compute resources available?<br>• Target embodiment(s)?</p></div>'
            },
            'vla-finetune': {
                number: '2',
                title: 'Fine-tuning',
                subtitle: 'Adapt to your specific task',
                content: '<div class="modal-section"><p class="modal-section-title">NVIDIA Tools</p><div class="modal-tool"><h4>Cosmos Policy</h4><p>State-of-the-art robot manipulation policy. Achieves SOTA on LIBERO and RoboCasa benchmarks.</p><a href="https://huggingface.co/blog/nvidia/cosmos-policy-for-robot-control" target="_blank" class="source-link">→ Hugging Face Blog</a></div><div class="modal-tool"><h4>NeMo</h4><p>Fine-tune foundation models with your task-specific data.</p><a href="https://www.nvidia.com/en-us/ai-data-science/products/nemo/" target="_blank" class="source-link">→ NeMo Platform</a></div></div><div class="modal-section"><p class="modal-section-title">Key Features</p><p>• Unified Architecture: Single model for perception, planning, and action<br>• Video Model Foundation: Built on Cosmos world model capabilities</p></div>'
            },
            'vla-deploy': {
                number: '3',
                title: 'Deployment',
                subtitle: 'Deploy VLA to production',
                content: '<div class="modal-section"><p class="modal-section-title">NVIDIA Tools</p><div class="modal-tool"><h4>NIM Microservices</h4><p>Containerized AI inference microservices. Deploy anywhere with optimized performance.</p><a href="https://docs.nvidia.com/nim/large-language-models/latest/getting-started.html" target="_blank" class="source-link">→ NIM Documentation</a></div><div class="modal-tool"><h4>TensorRT</h4><p>High-performance deep learning inference optimizer and runtime.</p><a href="https://developer.nvidia.com/tensorrt" target="_blank" class="source-link">→ TensorRT</a></div></div><div class="modal-section"><p class="modal-section-title">PM Decision Points</p><p>• Cloud vs edge deployment?<br>• Latency requirements?<br>• Scaling strategy?</p></div>'
            },
            
            // World Model Training Loop
            'wm-predict': {
                number: '1',
                title: 'Cosmos Predict 2.5',
                subtitle: 'Generate future video predictions',
                content: '<div class="modal-section"><p class="modal-section-title">NVIDIA Tools</p><div class="modal-tool"><h4>Cosmos Predict 2.5</h4><p>World Foundation Model for Physical AI. Generates up to 30 seconds of high-fidelity video from text, image, or video prompts.</p><a href="https://www.nvidia.com/en-us/ai/cosmos/" target="_blank" class="source-link">→ Cosmos Platform</a></div></div><div class="modal-section"><p class="modal-section-title">Capabilities</p><p>• Text-to-World: Generate worlds from text descriptions<br>• Video-to-World: Extend and predict future frames<br>• Physical AI training data generation</p></div>'
            },
            'wm-transfer': {
                number: '2',
                title: 'Cosmos Transfer 2.5',
                subtitle: 'Domain transfer from sim to real',
                content: '<div class="modal-section"><p class="modal-section-title">NVIDIA Tools</p><div class="modal-tool"><h4>Cosmos Transfer 2.5</h4><p>Transform 3D/spatial inputs from simulators into high-fidelity video. Bridge the sim-to-real gap with photorealistic outputs.</p><a href="https://www.nvidia.com/en-us/ai/cosmos/" target="_blank" class="source-link">→ Cosmos Platform</a></div></div><div class="modal-section"><p class="modal-section-title">Use Cases</p><p>• Convert simulation renders to photorealistic video<br>• Domain adaptation for robot policies<br>• Synthetic data enhancement</p></div>'
            },
            'wm-reason': {
                number: '3',
                title: 'Cosmos Reason 2.5',
                subtitle: 'Physics understanding and reasoning',
                content: '<div class="modal-section"><p class="modal-section-title">NVIDIA Tools</p><div class="modal-tool"><h4>Cosmos Reason 2.5</h4><p>Vision-Language Model for physical world understanding. Reasons about physics, spatial relationships, and scene dynamics.</p><a href="https://www.nvidia.com/en-us/ai/cosmos/" target="_blank" class="source-link">→ Cosmos Platform</a></div></div><div class="modal-section"><p class="modal-section-title">Capabilities</p><p>• Physical reasoning about objects and interactions<br>• Scene understanding and analysis<br>• Supports robot decision-making</p></div>'
            },
            'wm-policy': {
                number: '4',
                title: 'Cosmos Policy',
                subtitle: 'Robot manipulation policy',
                content: '<div class="modal-section"><p class="modal-section-title">NVIDIA Tools</p><div class="modal-tool"><h4>Cosmos Policy</h4><p>State-of-the-art robot manipulation policy built on Cosmos world model. Achieves SOTA results on LIBERO and RoboCasa benchmarks.</p><a href="https://huggingface.co/blog/nvidia/cosmos-policy-for-robot-control" target="_blank" class="source-link">→ Hugging Face Blog</a></div></div><div class="modal-section"><p class="modal-section-title">Key Features</p><p>• Unified Architecture: Single model for perception, planning, and action<br>• Video Model Foundation: Built on Cosmos world model capabilities<br>• Cross-task generalization</p></div>'
            },
            
            // Sim-to-Real Loop
            's2r-sim': {
                number: '1',
                title: 'Simulation Training',
                subtitle: 'Train with high-fidelity physics',
                content: '<div class="modal-section"><p class="modal-section-title">NVIDIA Tools</p><div class="modal-tool"><h4>Newton Physics Engine</h4><p>GPU-accelerated physics simulation. Developed with Google DeepMind and Disney Research.</p><a href="https://github.com/newton-physics/newton" target="_blank" class="source-link">→ GitHub</a></div><div class="modal-tool"><h4>Isaac Lab</h4><p>Robot learning framework with domain randomization support.</p><a href="https://isaac-sim.github.io/IsaacLab/" target="_blank" class="source-link">→ Documentation</a></div></div><div class="modal-section"><p class="modal-section-title">PM Decision Points</p><p>• What physics fidelity is needed?<br>• Domain randomization strategy?<br>• Compute requirements?</p></div>'
            },
            's2r-real': {
                number: '2',
                title: 'Real-World Testing',
                subtitle: 'Deploy to physical hardware',
                content: '<div class="modal-section"><p class="modal-section-title">NVIDIA Tools</p><div class="modal-tool"><h4>Jetson AGX Orin</h4><p>Edge AI computing for robotics. Run inference on the robot.</p><a href="https://developer.nvidia.com/embedded/jetson-agx-orin" target="_blank" class="source-link">→ Jetson</a></div><div class="modal-tool"><h4>Isaac ROS</h4><p>GPU-accelerated ROS packages for perception and navigation.</p><a href="https://developer.nvidia.com/isaac-ros" target="_blank" class="source-link">→ Isaac ROS</a></div></div><div class="modal-section"><p class="modal-section-title">PM Decision Points</p><p>• Hardware platform selection?<br>• Safety considerations?<br>• Testing environment setup?</p></div>'
            },
            's2r-analyze': {
                number: '3',
                title: 'Gap Analysis',
                subtitle: 'Identify sim-to-real gaps',
                content: '<div class="modal-section"><p class="modal-section-title">Process</p><div class="modal-tool"><h4>Performance Comparison</h4><p>Compare sim vs real performance metrics. Identify systematic failures.</p></div><div class="modal-tool"><h4>Physics Gap Analysis</h4><p>Analyze contact, friction, dynamics differences between sim and real.</p></div></div><div class="modal-section"><p class="modal-section-title">PM Decision Points</p><p>• What metrics to track?<br>• How to prioritize gaps?<br>• When to iterate vs. accept?</p></div>'
            },
            
            // Deployment Loop
            'deploy-hw': {
                number: '1',
                title: 'Hardware Deployment',
                subtitle: 'Deploy to production hardware',
                content: '<div class="modal-section"><p class="modal-section-title">NVIDIA Tools</p><div class="modal-tool"><h4>Jetson AGX Orin</h4><p>275 TOPS AI performance for autonomous machines.</p><a href="https://developer.nvidia.com/embedded/jetson-agx-orin" target="_blank" class="source-link">→ Jetson</a></div><div class="modal-tool"><h4>Jetson Thor</h4><p>Next-gen robotics compute platform (coming soon).</p><a href="https://developer.nvidia.com/embedded" target="_blank" class="source-link">→ NVIDIA Embedded</a></div></div><div class="modal-section"><p class="modal-section-title">PM Decision Points</p><p>• Edge vs cloud compute?<br>• Power and thermal constraints?<br>• Cost per unit?</p></div>'
            },
            'deploy-monitor': {
                number: '2',
                title: 'Monitoring',
                subtitle: 'Track fleet performance',
                content: '<div class="modal-section"><p class="modal-section-title">NVIDIA Tools</p><div class="modal-tool"><h4>OSMO</h4><p>Orchestration platform for distributed robot fleets. Manage training and deployment at scale.</p><a href="https://developer.nvidia.com/osmo" target="_blank" class="source-link">→ OSMO</a></div></div><div class="modal-section"><p class="modal-section-title">PM Decision Points</p><p>• What KPIs to track?<br>• Alerting thresholds?<br>• Data collection for improvement?</p></div>'
            },
            'deploy-improve': {
                number: '3',
                title: 'Continuous Improvement',
                subtitle: 'Iterate based on production data',
                content: '<div class="modal-section"><p class="modal-section-title">Process</p><div class="modal-tool"><h4>Data Pipeline</h4><p>Collect production data for model improvement. Feed back into training loops.</p></div><div class="modal-tool"><h4>A/B Testing</h4><p>Test new policies on subset of fleet before full rollout.</p></div></div><div class="modal-section"><p class="modal-section-title">PM Decision Points</p><p>• How often to update models?<br>• Rollout strategy?<br>• Rollback procedures?</p></div>'
            }
        };
        
        return data[stageId] || null;
    }
})();
