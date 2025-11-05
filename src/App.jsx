import React, { useState, useEffect, useCallback } from 'react';
import { 
  Siren, Heart, Flame, Zap, Radio, Navigation, Activity, 
  Clock, MapPin, PhoneCall, Users, Target, TrendingUp, AlertTriangle 
} from 'lucide-react';

const AmbulanceDispatch = () => {
  // Enhanced city network with 20 interconnected nodes
  const cityNodes = [
    { id: 1, x: 100, y: 80, name: "Central Station", color: "#FF6B6B", icon: "🏛️" },
    { id: 2, x: 250, y: 60, name: "North Medical", color: "#4ECDC4", icon: "🏥" },
    { id: 3, x: 400, y: 70, name: "Tech Valley", color: "#95E1D3", icon: "💼" },
    { id: 4, x: 550, y: 85, name: "East Port", color: "#F38181", icon: "⚓" },
    { id: 5, x: 80, y: 180, name: "West Quarter", color: "#AA96DA", icon: "🏘️" },
    { id: 6, x: 220, y: 170, name: "Downtown", color: "#FCBAD3", icon: "🌆" },
    { id: 7, x: 350, y: 185, name: "City Square", color: "#FFFFD2", icon: "⛲" },
    { id: 8, x: 480, y: 175, name: "Commerce Hub", color: "#A8D8EA", icon: "🏪" },
    { id: 9, x: 580, y: 190, name: "Bay District", color: "#FDCB9E", icon: "🌊" },
    { id: 10, x: 100, y: 280, name: "Park Lane", color: "#C7CEEA", icon: "🌳" },
    { id: 11, x: 240, y: 270, name: "Metro Center", color: "#FFDAB9", icon: "🚇" },
    { id: 12, x: 370, y: 285, name: "University", color: "#B4F8C8", icon: "🎓" },
    { id: 13, x: 500, y: 275, name: "Innovation Park", color: "#FBE7C6", icon: "🔬" },
    { id: 14, x: 90, y: 380, name: "South Gardens", color: "#A0E7E5", icon: "🌺" },
    { id: 15, x: 230, y: 370, name: "Cultural District", color: "#FFAEBC", icon: "🎭" },
    { id: 16, x: 360, y: 385, name: "Sports Complex", color: "#B4E7CE", icon: "⚽" },
    { id: 17, x: 490, y: 375, name: "Airport Zone", color: "#FFC8DD", icon: "✈️" },
    { id: 18, x: 160, y: 460, name: "Harbor View", color: "#BDB2FF", icon: "🏖️" },
    { id: 19, x: 320, y: 470, name: "Industrial", color: "#CAFFBF", icon: "🏭" },
    { id: 20, x: 450, y: 465, name: "Residential", color: "#FFD6A5", icon: "🏠" }
  ];

  // Complex road network
  const roads = [
    // Top tier
    { from: 1, to: 2, time: 3 }, { from: 2, to: 3, time: 4 }, { from: 3, to: 4, time: 3 },
    // Second tier
    { from: 5, to: 6, time: 2 }, { from: 6, to: 7, time: 3 }, { from: 7, to: 8, time: 3 }, { from: 8, to: 9, time: 4 },
    // Third tier
    { from: 10, to: 11, time: 3 }, { from: 11, to: 12, time: 2 }, { from: 12, to: 13, time: 3 },
    // Fourth tier
    { from: 14, to: 15, time: 3 }, { from: 15, to: 16, time: 2 }, { from: 16, to: 17, time: 3 },
    // Bottom tier
    { from: 18, to: 19, time: 4 }, { from: 19, to: 20, time: 3 },
    // Vertical connections
    { from: 1, to: 5, time: 2 }, { from: 5, to: 10, time: 2 }, { from: 10, to: 14, time: 3 },
    { from: 2, to: 6, time: 2 }, { from: 6, to: 11, time: 2 }, { from: 11, to: 15, time: 2 }, { from: 15, to: 18, time: 3 },
    { from: 3, to: 7, time: 2 }, { from: 7, to: 12, time: 2 }, { from: 12, to: 16, time: 2 }, { from: 16, to: 19, time: 3 },
    { from: 4, to: 8, time: 2 }, { from: 8, to: 13, time: 2 }, { from: 13, to: 17, time: 2 }, { from: 17, to: 20, time: 3 },
    { from: 4, to: 9, time: 2 },
    // Diagonal shortcuts
    { from: 1, to: 6, time: 4 }, { from: 2, to: 7, time: 3 }, { from: 3, to: 8, time: 4 },
    { from: 6, to: 12, time: 4 }, { from: 7, to: 13, time: 4 }, { from: 11, to: 16, time: 4 },
    { from: 5, to: 11, time: 5 }, { from: 10, to: 15, time: 4 }, { from: 14, to: 18, time: 5 },
    { from: 8, to: 12, time: 5 }, { from: 9, to: 13, time: 4 }
  ];

  const [ambulances, setAmbulances] = useState([
    { id: 1, nodeId: 1, status: 'available', name: "RESCUE-01", color: "#FF6B9D", missions: 0 },
    { id: 2, nodeId: 7, status: 'available', name: "LIFE-02", color: "#C44569", missions: 0 },
    { id: 3, nodeId: 13, status: 'available', name: "CARE-03", color: "#F8B500", missions: 0 },
    { id: 4, nodeId: 20, status: 'available', name: "SWIFT-04", color: "#1B9CFC", missions: 0 }
  ]);

  const [hospitals] = useState([
    { id: 1, nodeId: 2, name: "North Medical Center", beds: 250, specialty: "Trauma" },
    { id: 2, nodeId: 11, name: "Metro General Hospital", beds: 400, specialty: "Emergency" },
    { id: 3, nodeId: 17, name: "Airport Medical Hub", beds: 180, specialty: "Critical Care" }
  ]);

  const [emergencyCalls, setEmergencyCalls] = useState([]);
  const [activePaths, setActivePaths] = useState([]);
  const [callId, setCallId] = useState(1);
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredCall, setHoveredCall] = useState(null);
  const [stats, setStats] = useState({
    totalCalls: 0,
    completed: 0,
    avgResponseTime: 0,
    activeUnits: 0
  });


  // Dijkstra's Algorithm - The Core Pathfinding Engine
  const findShortestPath = useCallback((startNode, endNode) => {
    const distances = {};
    const previous = {};
    const unvisited = new Set();

    cityNodes.forEach(node => {
      distances[node.id] = node.id === startNode ? 0 : Infinity;
      unvisited.add(node.id);
    });

    while (unvisited.size > 0) {
      let current = null;
      let minDistance = Infinity;
      
      unvisited.forEach(nodeId => {
        if (distances[nodeId] < minDistance) {
          minDistance = distances[nodeId];
          current = nodeId;
        }
      });

      if (current === null || current === endNode) break;
      unvisited.delete(current);

      roads.forEach(road => {
        let neighbor = null;
        if (road.from === current) neighbor = road.to;
        else if (road.to === current) neighbor = road.from;

        if (neighbor && unvisited.has(neighbor)) {
          const newDistance = distances[current] + road.time;
          if (newDistance < distances[neighbor]) {
            distances[neighbor] = newDistance;
            previous[neighbor] = current;
          }
        }
      });
    }

    const path = [];
    let current = endNode;
    while (current !== undefined) {
      path.unshift(current);
      current = previous[current];
    }

    return path.length > 1 ? { path, totalTime: distances[endNode] } : null;
  }, []);

  // Enhanced emergency with multiple severity levels and types
  const addEmergencyCall = () => {
    const randomNode = cityNodes[Math.floor(Math.random() * cityNodes.length)];
    const severities = [
      { level: 'critical', color: '#FF1744', priority: 1, types: ['Cardiac Arrest', 'Major Trauma', 'Severe Hemorrhage'] },
      { level: 'high', color: '#FF6F00', priority: 2, types: ['Stroke', 'Respiratory Distress', 'Chest Pain'] },
      { level: 'medium', color: '#FDD835', priority: 3, types: ['Fracture', 'Burns', 'Severe Pain'] },
      { level: 'low', color: '#66BB6A', priority: 4, types: ['Minor Injury', 'Medical Transport', 'Check-up'] }
    ];
    
    const severity = severities[Math.floor(Math.random() * severities.length)];
    const type = severity.types[Math.floor(Math.random() * severity.types.length)];
    
    const newCall = {
      id: callId,
      nodeId: randomNode.id,
      location: randomNode.name,
      timestamp: new Date().toLocaleTimeString(),
      status: 'pending',
      severity: severity.level,
      severityColor: severity.color,
      priority: severity.priority,
      type: type,
      patientCount: Math.floor(Math.random() * 3) + 1,
      assignedAmbulance: null
    };
    
    setEmergencyCalls(prev => [...prev, newCall].sort((a, b) => a.priority - b.priority));
    setCallId(prev => prev + 1);
    setStats(prev => ({ ...prev, totalCalls: prev.totalCalls + 1 }));
  };

  // Smart dispatch with priority handling
  const dispatchAmbulance = (callId) => {
    const call = emergencyCalls.find(c => c.id === callId);
    if (!call) return;

    let nearestAmbulance = null;
    let shortestTime = Infinity;

    ambulances.forEach(ambulance => {
      if (ambulance.status === 'available') {
        const route = findShortestPath(ambulance.nodeId, call.nodeId);
        if (route && route.totalTime < shortestTime) {
          shortestTime = route.totalTime;
          nearestAmbulance = { ...ambulance, route };
        }
      }
    });

    if (!nearestAmbulance) {
      return;
    }

    // Update ambulance
    setAmbulances(prev => prev.map(amb => 
      amb.id === nearestAmbulance.id 
        ? { ...amb, status: 'dispatched', assignedCall: callId }
        : amb
    ));

    // Update call
    setEmergencyCalls(prev => prev.map(c => 
      c.id === callId 
        ? { ...c, status: 'dispatched', assignedAmbulance: nearestAmbulance.id }
        : c
    ));

    // Add active path
    setActivePaths(prev => [...prev, {
      id: `path-${nearestAmbulance.id}-${callId}`,
      path: nearestAmbulance.route.path,
      ambulanceId: nearestAmbulance.id,
      callId: callId,
      estimatedTime: nearestAmbulance.route.totalTime,
      color: nearestAmbulance.color
    }]);

    setStats(prev => ({ 
      ...prev, 
      activeUnits: prev.activeUnits + 1
    }));

    // Simulate arrival at emergency
    setTimeout(() => {
      
      // Transport to nearest hospital
      const nearestHospital = findNearestHospital(call.nodeId);
      const hospitalRoute = findShortestPath(call.nodeId, nearestHospital.nodeId);
      
      setTimeout(() => {
        // Complete mission
        setAmbulances(prev => prev.map(amb => 
          amb.id === nearestAmbulance.id 
            ? { 
                ...amb, 
                status: 'available', 
                assignedCall: null, 
                nodeId: nearestHospital.nodeId,
                missions: amb.missions + 1 
              }
            : amb
        ));
        
        setEmergencyCalls(prev => prev.filter(c => c.id !== callId));
        setActivePaths(prev => prev.filter(p => p.callId !== callId));
        
        setStats(prev => ({
          ...prev,
          activeUnits: Math.max(0, prev.activeUnits - 1),
          completed: prev.completed + 1,
          avgResponseTime: Math.round((prev.avgResponseTime * prev.completed + nearestAmbulance.route.totalTime) / (prev.completed + 1))
        }));
        
      }, 3000);
      
    }, nearestAmbulance.route.totalTime * 1000);
  };

  const findNearestHospital = (nodeId) => {
    let nearest = hospitals[0];
    let shortestDistance = Infinity;

    hospitals.forEach(hospital => {
      const route = findShortestPath(nodeId, hospital.nodeId);
      if (route && route.totalTime < shortestDistance) {
        shortestDistance = route.totalTime;
        nearest = hospital;
      }
    });

    return nearest;
  };

  const getNodeById = (id) => cityNodes.find(node => node.id === id);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 overflow-hidden relative">
      {/* Animated background layers */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 opacity-70 animate-gradient"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-cyan-400 via-blue-500 to-purple-600 opacity-50 animate-gradient-delayed"></div>
      </div>
      
      {/* Animated blob background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-6000"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-8000"></div>
      </div>

      <div className="relative max-w-[1800px] mx-auto p-6">
        {/* Header */}
        <div className="rounded-3xl shadow-2xl p-8 mb-6 border-4 border-white/30 relative overflow-hidden" style={{background: '#FFE5E5'}}>
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl animate-float-delayed"></div>
          </div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-white/30 rounded-3xl blur-xl animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-white/30 to-white/10 p-5 rounded-3xl backdrop-blur-xl border-2 border-white/40 shadow-xl">
                  <Siren className="w-14 h-14 text-white drop-shadow-lg animate-pulse" />
                </div>
              </div>
              <div>
                <h1 className="text-6xl font-black text-white mb-2 tracking-tight drop-shadow-2xl">
                  🚨 EMERGENCY COMMAND HQ
                </h1>
                <p className="text-2xl text-white font-bold drop-shadow-lg flex items-center gap-2">
                  <Zap className="w-6 h-6 text-yellow-300 animate-pulse" />
                  Real-Time Dijkstra's Shortest Path Optimization System
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              {/* Total Calls */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition"></div>
                <div className="relative bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl px-8 py-5 text-center shadow-2xl transform hover:scale-110 transition-all border-4 border-white/40">
                  <div className="absolute top-2 right-2">
                    <PhoneCall className="w-5 h-5 text-white/60" />
                  </div>
                  <div className="text-4xl font-black text-white drop-shadow-lg mb-1">{stats.totalCalls}</div>
                  <div className="text-xs text-white font-black tracking-wider uppercase">Total Calls</div>
                </div>
              </div>
              
              {/* Completed */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-300 to-emerald-400 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition"></div>
                <div className="relative bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 rounded-2xl px-8 py-5 text-center shadow-2xl transform hover:scale-110 transition-all border-4 border-white/40">
                  <div className="absolute top-2 right-2">
                    <Heart className="w-5 h-5 text-white/60" />
                  </div>
                  <div className="text-4xl font-black text-white drop-shadow-lg mb-1">{stats.completed}</div>
                  <div className="text-xs text-white font-black tracking-wider uppercase">Completed</div>
                </div>
              </div>
              
              {/* Active Units */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-cyan-400 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition"></div>
                <div className="relative bg-gradient-to-br from-blue-400 via-cyan-500 to-sky-500 rounded-2xl px-8 py-5 text-center shadow-2xl transform hover:scale-110 transition-all border-4 border-white/40">
                  <div className="absolute top-2 right-2">
                    <Radio className="w-5 h-5 text-white/60 animate-pulse" />
                  </div>
                  <div className="text-4xl font-black text-white drop-shadow-lg mb-1">{stats.activeUnits}</div>
                  <div className="text-xs text-white font-black tracking-wider uppercase">Active</div>
                </div>
              </div>
              
              {/* Average Time */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-pink-400 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition"></div>
                <div className="relative bg-gradient-to-br from-purple-400 via-pink-500 to-rose-500 rounded-2xl px-8 py-5 text-center shadow-2xl transform hover:scale-110 transition-all border-4 border-white/40">
                  <div className="absolute top-2 right-2">
                    <Clock className="w-5 h-5 text-white/60" />
                  </div>
                  <div className="text-4xl font-black text-white drop-shadow-lg mb-1">{stats.avgResponseTime}m</div>
                  <div className="text-xs text-white font-black tracking-wider uppercase">Avg Time</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Panel */}
          <div className="col-span-4 flex flex-col" style={{height: '600px'}}>
            {/* Emergency Call Button */}
            <button
              onClick={addEmergencyCall}
              className="w-full bg-gradient-to-r from-red-600 via-red-500 to-pink-600 hover:from-red-700 hover:via-red-600 hover:to-pink-700 text-white font-black py-6 px-8 rounded-2xl shadow-2xl transform hover:scale-105 transition flex items-center justify-center gap-3 border-4 border-white/30 mb-6"
            >
              <PhoneCall className="w-8 h-8 animate-pulse" />
              <span className="text-2xl">NEW EMERGENCY CALL</span>
            </button>

            {/* Emergency Calls List */}
            <div className="rounded-2xl p-6 shadow-2xl border-4 border-white/20 mb-6 flex-shrink-0" style={{background: '#C5D3DA', backdropFilter: 'blur(20px)', height: '200px'}}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-white text-2xl flex items-center gap-2">
                  <AlertTriangle className="w-7 h-7 text-yellow-400" />
                  ACTIVE EMERGENCIES
                </h3>
                <span className="bg-red-600 text-white text-lg font-black px-4 py-2 rounded-full animate-pulse">
                  {emergencyCalls.length}
                </span>
              </div>
              
              <div className="space-y-3 overflow-y-auto custom-scrollbar" style={{height: 'calc(100% - 60px)'}}>
                {emergencyCalls.length === 0 ? (
                  <div className="text-center py-12 text-white/60">
                    <Activity className="w-16 h-16 mx-auto mb-3 opacity-50" />
                    <p className="text-lg font-bold">All Clear - No Emergencies</p>
                  </div>
                ) : (
                  emergencyCalls.map(call => (
                    <div
                      key={call.id}
                      onMouseEnter={() => setHoveredCall(call.id)}
                      onMouseLeave={() => setHoveredCall(null)}
                      className={`bg-gradient-to-r ${
                        call.severity === 'critical' ? 'from-red-600 to-pink-600' :
                        call.severity === 'high' ? 'from-orange-500 to-red-500' :
                        call.severity === 'medium' ? 'from-yellow-500 to-orange-500' :
                        'from-green-500 to-emerald-500'
                      } rounded-xl p-4 shadow-xl border-4 border-white/30 transform transition-all ${
                        hoveredCall === call.id ? 'scale-105 shadow-2xl' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="font-black text-white text-lg">CALL #{call.id}</span>
                        <div className="flex gap-2">
                          <span className="bg-white/30 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-black">
                            P{call.priority}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-black ${
                            call.status === 'pending' ? 'bg-yellow-400 text-gray-900 animate-pulse' : 
                            'bg-blue-400 text-white'
                          }`}>
                            {call.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-white font-bold">
                          <MapPin className="w-4 h-4" />
                          {call.location}
                        </div>
                        <div className="flex items-center gap-2 text-white font-bold">
                          <Heart className="w-4 h-4" />
                          {call.type} • {call.patientCount} patient(s)
                        </div>
                        <div className="flex items-center gap-2 text-white/90 text-sm font-bold">
                          <Clock className="w-4 h-4" />
                          {call.timestamp}
                        </div>
                      </div>
                      
                      {call.status === 'pending' && (
                        <button
                          onClick={() => dispatchAmbulance(call.id)}
                          className="w-full bg-white hover:bg-gray-100 text-gray-900 py-3 px-4 rounded-lg font-black flex items-center justify-center gap-2 transition transform hover:scale-105 shadow-lg"
                        >
                          <Navigation className="w-5 h-5" />
                          DISPATCH NOW
                        </button>
                      )}
                      
                      {call.status === 'dispatched' && (
                        <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center border-2 border-white/40">
                          <p className="text-white font-black text-sm animate-pulse">
                            🚑 UNIT {call.assignedAmbulance} EN ROUTE
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Ambulance Fleet */}
            <div className="rounded-2xl p-6 shadow-2xl border-4 border-white/20 flex-1 flex flex-col" style={{background: '#C5D3DA', backdropFilter: 'blur(20px)'}}>
              <h3 className="font-black text-white text-2xl mb-4 flex items-center gap-2">
                <Zap className="w-7 h-7 text-yellow-400" />
                AMBULANCE FLEET
              </h3>
              
              <div className="space-y-3 overflow-y-auto custom-scrollbar flex-1">
                {ambulances.map(ambulance => {
                  const location = getNodeById(ambulance.nodeId);
                  return (
                    <div
                      key={ambulance.id}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-4 shadow-xl border-4 border-white/30 transform hover:scale-105 transition"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-black text-white text-lg">{ambulance.name}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-2 ${
                          ambulance.status === 'available' 
                            ? 'bg-green-400 text-gray-900' 
                            : 'bg-orange-400 text-white animate-pulse'
                        }`}>
                          <div className="w-2 h-2 rounded-full bg-white animate-ping"></div>
                          {ambulance.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-white/90 font-bold text-sm flex items-center gap-2">
                          <MapPin className="w-3 h-3" />
                          {location?.name} {location?.icon}
                        </div>
                        <div className="text-white/90 font-bold text-sm flex items-center gap-2">
                          <Target className="w-3 h-3" />
                          Missions: {ambulance.missions}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="col-span-8">
            {/* Main Map */}
            <div className="rounded-3xl p-8 shadow-2xl border-4 border-white/20" style={{background: '#FFF5E6', backdropFilter: 'blur(20px)', height: '600px'}}>
              <div className="bg-black/30 backdrop-blur-xl rounded-2xl border-4 border-cyan-400/50 shadow-inner" style={{ height: '100%' }}>
                <svg width="100%" height="100%" viewBox="0 0 680 560">
                  <defs>
                    <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#60A5FA', stopOpacity: 0.6}} />
                      <stop offset="100%" style={{stopColor: '#A78BFA', stopOpacity: 0.6}} />
                    </linearGradient>
                    
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    
                    <filter id="strongGlow">
                      <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Roads */}
                  {roads.map((road, index) => {
                    const fromNode = getNodeById(road.from);
                    const toNode = getNodeById(road.to);
                    return (
                      <line
                        key={index}
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        stroke="url(#roadGrad)"
                        strokeWidth="5"
                        opacity="0.7"
                      />
                    );
                  })}

                  {/* Active Paths with Animation */}
                  {activePaths.map((pathData) => {
                    return pathData.path.map((nodeId, index) => {
                      if (index === pathData.path.length - 1) return null;
                      const fromNode = getNodeById(nodeId);
                      const toNode = getNodeById(pathData.path[index + 1]);
                      return (
                        <g key={`${pathData.id}-${index}`}>
                          <line
                            x1={fromNode.x}
                            y1={fromNode.y}
                            x2={toNode.x}
                            y2={toNode.y}
                            stroke={pathData.color}
                            strokeWidth="8"
                            opacity="0.3"
                            filter="url(#glow)"
                          />
                          <line
                            x1={fromNode.x}
                            y1={fromNode.y}
                            x2={toNode.x}
                            y2={toNode.y}
                            stroke={pathData.color}
                            strokeWidth="6"
                            strokeDasharray="12,8"
                            filter="url(#strongGlow)"
                          >
                            <animate
                              attributeName="stroke-dashoffset"
                              from="0"
                              to="40"
                              dur="1.5s"
                              repeatCount="indefinite"
                            />
                          </line>
                        </g>
                      );
                    });
                  })}

                  {/* Nodes */}
                  {cityNodes.map(node => (
                    <g 
                      key={node.id}
                      onMouseEnter={() => setSelectedNode(node.id)}
                      onMouseLeave={() => setSelectedNode(null)}
                      style={{ cursor: 'pointer' }}
                    >
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={selectedNode === node.id ? "18" : "12"}
                        fill={node.color}
                        stroke="#ffffff"
                        strokeWidth="3"
                        filter="url(#glow)"
                        className="transition-all"
                      />
                      <text
                        x={node.x}
                        y={node.y - 25}
                        textAnchor="middle"
                        className="font-black fill-white"
                        style={{ fontSize: selectedNode === node.id ? '14px' : '12px' }}
                        filter="url(#glow)"
                      >
                        {node.name}
                      </text>
                      <text
                        x={node.x}
                        y={node.y + 30}
                        textAnchor="middle"
                        style={{ fontSize: '16px' }}
                      >
                        {node.icon}
                      </text>
                    </g>
                  ))}

                  {/* Hospitals */}
                  {hospitals.map(hospital => {
                    const node = getNodeById(hospital.nodeId);
                    return (
                      <g key={hospital.id}>
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="30"
                          fill="#FF1744"
                          opacity="0.2"
                          className="animate-ping"
                          style={{ animationDuration: '2s' }}
                        />
                        <rect
                          x={node.x - 20}
                          y={node.y - 20}
                          width="40"
                          height="40"
                          fill="#FF1744"
                          rx="8"
                          filter="url(#strongGlow)"
                          stroke="#ffffff"
                          strokeWidth="4"
                        />
                        <text
                          x={node.x}
                          y={node.y + 8}
                          textAnchor="middle"
                          className="font-black fill-white"
                          style={{ fontSize: '28px' }}
                        >
                          +
                        </text>
                      </g>
                    );
                  })}

                  {/* Ambulances */}
                  {ambulances.map(ambulance => {
                    const node = getNodeById(ambulance.nodeId);
                    return (
                      <g key={ambulance.id}>
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="28"
                          fill={ambulance.color}
                          opacity="0.4"
                          className={ambulance.status === 'dispatched' ? 'animate-ping' : ''}
                        />
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="22"
                          fill={ambulance.color}
                          stroke="#ffffff"
                          strokeWidth="4"
                          filter="url(#strongGlow)"
                        />
                        <text
                          x={node.x}
                          y={node.y + 6}
                          textAnchor="middle"
                          className="font-black fill-white"
                          style={{ fontSize: '18px' }}
                        >
                          {ambulance.id}
                        </text>
                      </g>
                    );
                  })}

                  {/* Emergency Calls */}
                  {emergencyCalls.map(call => {
                    const node = getNodeById(call.nodeId);
                    return (
                      <g key={call.id}>
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="35"
                          fill={call.severityColor}
                          opacity="0.3"
                          className="animate-ping"
                        />
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="28"
                          fill={call.severityColor}
                          stroke="#ffffff"
                          strokeWidth="5"
                          filter="url(#strongGlow)"
                        />
                        <text
                          x={node.x}
                          y={node.y + 8}
                          textAnchor="middle"
                          className="font-black fill-white"
                          style={{ fontSize: '24px' }}
                        >
                          !
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Legend & Active Dispatch Info */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          {/* Legend */}
          <div className="rounded-2xl p-6 shadow-2xl border-4 border-white/20" style={{background: '#C5D3DA', backdropFilter: 'blur(20px)'}}>
            <h4 className="font-black text-white text-xl mb-4">🎨 MAP LEGEND</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full border-2 border-white"></div>
                <span className="text-white font-bold">Available Unit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-600 rounded-full border-2 border-white animate-pulse"></div>
                <span className="text-white font-bold">Dispatched</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-red-600 rounded-full border-2 border-white"></div>
                <span className="text-white font-bold">Critical</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-orange-500 rounded-full border-2 border-white"></div>
                <span className="text-white font-bold">High Priority</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-yellow-500 rounded-full border-2 border-white"></div>
                <span className="text-white font-bold">Medium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                <span className="text-white font-bold">Low Priority</span>
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <div className="w-8 h-8 bg-red-600 rounded-lg border-2 border-white flex items-center justify-center text-white font-black">+</div>
                <span className="text-white font-bold">Hospital</span>
              </div>
            </div>
          </div>

          {/* Active Dispatches */}
          <div className="rounded-2xl p-6 shadow-2xl border-4 border-white/20" style={{background: '#C5D3DA', backdropFilter: 'blur(20px)'}}>
            <h4 className="font-black text-white text-xl mb-4">🚀 ACTIVE DISPATCHES</h4>
            {activePaths.length === 0 ? (
              <p className="text-white/60 text-center py-8 font-bold">No active dispatches</p>
            ) : (
              <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
                {activePaths.map(pathData => {
                  const call = emergencyCalls.find(c => c.id === pathData.callId);
                  const ambulance = ambulances.find(a => a.id === pathData.ambulanceId);
                  return (
                    <div key={pathData.id} className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-3 border-2 border-white/40">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-white font-black text-sm">
                            {ambulance?.name} → {call?.location}
                          </p>
                          <p className="text-white/80 text-xs font-bold">
                            ETA: {pathData.estimatedTime} min
                          </p>
                        </div>
                        <TrendingUp className="w-5 h-5 text-white animate-pulse" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        
        @keyframes gradient {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(50px, -50px) scale(1.1) rotate(120deg); }
          66% { transform: translate(-50px, 50px) scale(0.95) rotate(240deg); }
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-gradient {
          animation: gradient 15s ease-in-out infinite;
        }
        
        .animate-gradient-delayed {
          animation: gradient 20s ease-in-out infinite;
          animation-delay: 5s;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite;
          animation-delay: 3s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animation-delay-6000 {
          animation-delay: 6s;
        }
        
        .animation-delay-8000 {
          animation-delay: 8s;
        }
        
        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #FF6B9D, #C44569);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #FF8FB3, #D45579);
        }
      `}</style>
    </div>
  );
};

export default AmbulanceDispatch;