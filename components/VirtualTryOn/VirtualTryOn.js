"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useAppContext } from "@/context/Context";

const VirtualTryOn = () => {
  const { isLightTheme } = useAppContext();
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedClothing, setSelectedClothing] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleModelUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedModel(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClothingUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedClothing(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVirtualTryOn = async () => {
    if (!selectedModel || !selectedClothing) {
      alert("Please upload both model and clothing images");
      return;
    }

    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setResultImage(selectedModel); // In real implementation, this would be the AI result
      setIsProcessing(false);
    }, 3000);
  };

  const downloadResult = () => {
    if (resultImage) {
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = 'virtual-tryon-result.jpg';
      link.click();
    }
  };

  return (
    <div className="virtual-tryon-container">
      <div className="row g-4">
        {/* Left Side - Model Display */}
        <div className="col-xl-7 col-lg-7 col-md-12">
          <div className="model-display-section">
            <div className="section-header mb-4">
              <h4 className="title">Model Preview</h4>
              <p className="description">Upload a model image to see the virtual try-on result</p>
            </div>
            
            <div className="model-upload-area">
              {selectedModel ? (
                <div className="model-preview">
                  <Image
                    src={selectedModel}
                    alt="Model"
                    width={800}
                    height={1000}
                    className="model-image"
                    style={{ objectFit: 'cover', borderRadius: '12px', width: '100%', height: 'auto' }}
                  />
                  {resultImage && (
                    <div className="result-overlay">
                      <div className="result-badge">
                        <i className="feather-check-circle"></i>
                        <span>Virtual Try-On Complete</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div 
                  className="upload-placeholder"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="upload-content">
                    <i className="feather-upload-cloud"></i>
                    <h5>Upload Model Image</h5>
                    <p>Click to select a model photo</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleModelUpload}
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Settings Panel */}
        <div className="col-xl-5 col-lg-5 col-md-12">
          <div className="settings-panel">
            <div className="section-header mb-4">
              <h4 className="title">Virtual Try-On Settings</h4>
              <p className="description">Configure your virtual try-on experience</p>
            </div>

            {/* Clothing Upload */}
            <div className="setting-group mb-4">
              <label className="setting-label">Clothing Item</label>
              <div className="clothing-upload">
                {selectedClothing ? (
                  <div className="clothing-preview">
                    <Image
                      src={selectedClothing}
                      alt="Clothing"
                      width={200}
                      height={200}
                      className="clothing-image"
                      style={{ objectFit: 'cover', borderRadius: '8px' }}
                    />
                    <button 
                      className="btn-change"
                      onClick={() => setSelectedClothing(null)}
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <div 
                    className="clothing-upload-placeholder"
                    onClick={() => document.getElementById('clothing-upload')?.click()}
                  >
                    <i className="feather-plus"></i>
                    <span>Upload Clothing</span>
                    <input
                      id="clothing-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleClothingUpload}
                      style={{ display: 'none' }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Settings */}
            <div className="setting-group mb-4">
              <label className="setting-label">Fit Adjustment</label>
              <div className="slider-group">
                <div className="slider-item">
                  <label>Size</label>
                  <input type="range" min="0" max="100" defaultValue="50" className="slider" />
                </div>
                <div className="slider-item">
                  <label>Position</label>
                  <input type="range" min="0" max="100" defaultValue="50" className="slider" />
                </div>
                <div className="slider-item">
                  <label>Opacity</label>
                  <input type="range" min="0" max="100" defaultValue="100" className="slider" />
                </div>
              </div>
            </div>

            {/* Style Options */}
            <div className="setting-group mb-4">
              <label className="setting-label">Style Options</label>
              <div className="style-options">
                <button className="style-btn active">Casual</button>
                <button className="style-btn">Formal</button>
                <button className="style-btn">Sport</button>
                <button className="style-btn">Vintage</button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button 
                className="btn-primary btn-large w-100 mb-3"
                onClick={handleVirtualTryOn}
                disabled={!selectedModel || !selectedClothing || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <i className="feather-loader spin"></i>
                    Processing...
                  </>
                ) : (
                  <>
                    <i className="feather-zap"></i>
                    Start Virtual Try-On
                  </>
                )}
              </button>

              {resultImage && (
                <button 
                  className="btn-secondary btn-large w-100"
                  onClick={downloadResult}
                >
                  <i className="feather-download"></i>
                  Download Result
                </button>
              )}
            </div>

            {/* Tips */}
            <div className="tips-section">
              <h6>Tips for Best Results:</h6>
              <ul>
                <li>Use high-quality model photos</li>
                <li>Ensure good lighting</li>
                <li>Model should be facing forward</li>
                <li>Clothing should be on a plain background</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .virtual-tryon-container {
          padding: 3rem;
          background: ${isLightTheme ? 'var(--color-bg-1)' : 'var(--color-white)'};
          border-radius: 12px;
          box-shadow: ${isLightTheme ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.1)'};
          border: 1px solid ${isLightTheme ? 'var(--color-border)' : 'var(--color-lighter)'};
          min-height: calc(100vh - 200px);
          max-width: 100%;
          margin: 0 auto;
        }

        /* Override main content width for Virtual Try-On page */
        .rbt-main-content {
          width: 100% !important;
          max-width: 1600px !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }
        
        /* Make the entire page wider */
        .page-wrapper {
          max-width: 100% !important;
        }
        
        .rbt-daynamic-page-content {
          max-width: 100% !important;
        }

        .section-header {
          text-align: center;
        }

        .section-header .title {
          font-size: 1.5rem;
          font-weight: 600;
          color: ${isLightTheme ? 'var(--color-heading)' : 'var(--color-black)'};
          margin-bottom: 0.5rem;
        }

        .section-header .description {
          color: ${isLightTheme ? 'var(--color-body)' : 'var(--dark-color-link)'};
          font-size: 0.9rem;
        }

        .upload-placeholder {
          border: 2px dashed ${isLightTheme ? 'var(--color-border)' : 'var(--color-lighter)'};
          border-radius: 12px;
          padding: 4rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: ${isLightTheme ? 'var(--color-lessdark)' : 'var(--color-lightest)'};
          min-height: 600px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .upload-placeholder:hover {
          border-color: var(--color-primary);
          background: ${isLightTheme ? 'var(--color-primary)' : 'var(--color-border-2)'};
        }

        .upload-content i {
          font-size: 3rem;
          color: var(--color-primary);
          margin-bottom: 1rem;
        }

        .upload-content p {
          color: ${isLightTheme ? 'var(--color-body)' : 'var(--dark-color-link)'};
          font-size: 0.9rem;
          margin: 0;
        }

        .model-preview {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
        }

        .result-overlay {
          position: absolute;
          top: 1rem;
          right: 1rem;
        }

        .result-badge {
          background: var(--color-success);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }

        .settings-panel {
          background: ${isLightTheme ? 'var(--color-lessdark)' : 'var(--color-lightest)'};
          padding: 2rem;
          border-radius: 12px;
          height: fit-content;
          border: 1px solid ${isLightTheme ? 'var(--color-border)' : 'var(--color-lighter)'};
        }

        .setting-group {
          margin-bottom: 1.5rem;
        }

        .setting-label {
          font-weight: 600;
          color: ${isLightTheme ? 'var(--color-heading)' : 'var(--color-black)'};
          margin-bottom: 1rem;
          display: block;
        }

        .clothing-upload-placeholder {
          border: 2px dashed ${isLightTheme ? 'var(--color-border)' : 'var(--color-lighter)'};
          border-radius: 8px;
          padding: 2.5rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: ${isLightTheme ? 'var(--color-bg-1)' : 'var(--color-white)'};
          min-height: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .clothing-upload-placeholder:hover {
          border-color: var(--color-primary);
          background: ${isLightTheme ? 'var(--color-primary)' : 'var(--color-border-2)'};
        }

        .clothing-upload-placeholder i {
          font-size: 2.5rem;
          color: var(--color-primary);
          margin-bottom: 0.8rem;
        }
        
        .clothing-upload-placeholder span {
          font-size: 1.1rem;
          font-weight: 500;
        }

        .clothing-preview {
          position: relative;
        }

        .btn-change {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: var(--color-primary);
          color: white;
          border: none;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
          cursor: pointer;
        }

        .slider-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .slider-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .slider-item label {
          font-size: 1rem;
          color: ${isLightTheme ? 'var(--color-body)' : 'var(--dark-color-link)'};
          font-weight: 500;
        }

        .slider {
          width: 70%;
          height: 6px;
          border-radius: 3px;
          background: var(--color-border);
          outline: none;
          -webkit-appearance: none;
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .style-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
        }

        .style-btn {
          padding: 0.8rem 1.2rem;
          border: 1px solid ${isLightTheme ? 'var(--color-border)' : 'var(--color-lighter)'};
          background: ${isLightTheme ? 'var(--color-bg-1)' : 'var(--color-white)'};
          color: ${isLightTheme ? 'var(--color-heading)' : 'var(--color-black)'};
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          font-weight: 500;
          min-height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .style-btn:hover,
        .style-btn.active {
          background: var(--color-primary);
          color: white;
          border-color: var(--color-primary);
        }

        .action-buttons {
          margin-bottom: 2rem;
        }

        .btn-primary {
          background: var(--color-primary);
          color: white;
          border: none;
          padding: 1.2rem 2.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          font-size: 1.1rem;
          min-height: 55px;
        }

        .btn-primary:hover:not(:disabled) {
          background: var(--color-primary-dark);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-secondary {
          background: transparent;
          color: var(--color-primary);
          border: 1px solid var(--color-primary);
          padding: 1rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .btn-secondary:hover {
          background: var(--color-primary);
          color: white;
        }

        .spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .tips-section {
          background: ${isLightTheme ? 'var(--color-bg-1)' : 'var(--color-white)'};
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid ${isLightTheme ? 'var(--color-border)' : 'var(--color-lighter)'};
        }

        .tips-section h6 {
          color: ${isLightTheme ? 'var(--color-heading)' : 'var(--color-black)'};
          margin-bottom: 1rem;
        }

        .tips-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .tips-section li {
          padding: 0.25rem 0;
          color: ${isLightTheme ? 'var(--color-body)' : 'var(--dark-color-link)'};
          font-size: 0.9rem;
          position: relative;
          padding-left: 1.5rem;
        }

        .tips-section li:before {
          content: "•";
          color: var(--color-primary);
          position: absolute;
          left: 0;
        }

        @media (max-width: 1200px) {
          .virtual-tryon-container {
            padding: 2rem;
          }
          
          .upload-placeholder {
            min-height: 500px;
            padding: 3rem;
          }
          
          .rbt-main-content {
            max-width: 1400px !important;
          }
        }

        @media (max-width: 768px) {
          .virtual-tryon-container {
            padding: 1.5rem;
            margin: 1rem;
          }
          
          .settings-panel {
            padding: 1.5rem;
          }
          
          .upload-placeholder {
            min-height: 400px;
            padding: 2rem;
          }
          
          .section-header .title {
            font-size: 1.3rem;
          }
          
          .rbt-main-content {
            max-width: 100% !important;
            margin: 0 !important;
          }
        }

        @media (max-width: 576px) {
          .virtual-tryon-container {
            padding: 1rem;
            margin: 0.5rem;
          }
          
          .settings-panel {
            padding: 1rem;
          }
          
          .upload-placeholder {
            min-height: 300px;
            padding: 1.5rem;
          }
          
          .section-header .title {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default VirtualTryOn;
