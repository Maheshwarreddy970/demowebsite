// components/AdminAddProject.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { uploadImageToCloudinary } from '@/actions/cloudinary';
import { Upload } from 'lucide-react';

interface Project {
  name: string;
  title: string;
  titleimg: string[];
  lines: string[];
  images: string[];
}

interface WorkCollection {
  title: string;
  projects: Project[];
  featured_projects: {
    title: string;
    description: string;
    icon: string;
  };
  description?: string;
  work_collection_footer?: {
    company: {
      logo: string;
      name: string;
      tagline: string;
    };
    image: string;
  };
}

export default function AdminAddProject() {
  const [workData, setWorkData] = useState<WorkCollection | null>(null);
  const [newProject, setNewProject] = useState<Project>({
    name: '',
    title: '',
    titleimg: ['', ''], // Fixed to 2 title images
    lines: [''],        // Start with 1 line
    images: ['']        // Start with 1 image
  });
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const docRef = doc(db, 'website', 'workSection');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setWorkData(docSnap.data() as WorkCollection);
        } else {
          const defaultData = (await import('@/lib/data.json')).default;
          setWorkData(defaultData.workCollection as WorkCollection);
        }
      } catch (error) {
        console.error('Error fetching work section data:', error);
        const defaultData = (await import('@/lib/data.json')).default;
        setWorkData(defaultData.workCollection as WorkCollection);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleNewProjectChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Project,
    index?: number
  ) => {
    if (index !== undefined && (field === 'lines' || field === 'images')) {
      const updatedArray = [...newProject[field]] as string[];
      updatedArray[index] = e.target.value;
      setNewProject({ ...newProject, [field]: updatedArray });
    } else {
      setNewProject({ ...newProject, [field]: e.target.value });
    }
  };

  const addArrayItem = (field: 'lines' | 'images') => {
    setNewProject({
      ...newProject,
      [field]: [...newProject[field], '']
    });
  };

  const removeArrayItem = (field: 'lines' | 'images', index: number) => {
    const updatedArray = newProject[field].filter((_, i) => i !== index);
    setNewProject({ ...newProject, [field]: updatedArray });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'titleimg' | 'images', index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadStatus(`Uploading ${field} ${index + 1}...`);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const result = await uploadImageToCloudinary(formData);
      if (result.success && result.url) {
        const updatedArray = [...newProject[field]];
        updatedArray[index] = result.url;
        setNewProject({ ...newProject, [field]: updatedArray });
        setUploadStatus(`Uploaded ${field} ${index + 1} successfully!`);
      } else {
        setUploadStatus(`Failed to upload ${field} ${index + 1}: ${result.error}`);
        alert(result.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      setUploadStatus(`Error uploading ${field} ${index + 1}`);
      alert('Failed to upload image');
    }
  };

  const removeUploadedImage = (field: 'titleimg' | 'images', index: number) => {
    const updatedArray = [...newProject[field]];
    updatedArray[index] = ''; // Reset to empty string instead of removing the slot
    setNewProject({ ...newProject, [field]: updatedArray });
  };

  const handleAddProject = async () => {
    if (!newProject.name || !newProject.title || newProject.titleimg.some(url => !url)) {
      alert('Please provide a name, title, and exactly two title images.');
      return;
    }

    if (!workData) {
      alert('No work collection data available to update.');
      return;
    }

    const updatedProjects = [...workData.projects, newProject];
    const updatedWorkData = { ...workData, projects: updatedProjects };

    try {
      await setDoc(doc(db, 'website', 'workSection'), updatedWorkData);
      setWorkData(updatedWorkData);
      setNewProject({
        name: '',
        title: '',
        titleimg: ['', ''],
        lines: [''],
        images: ['']
      });
      setUploadStatus('');
      alert('New project added successfully!');
    } catch (error) {
      console.error('Error adding project: ', error);
      alert('Error adding new project');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Project to Work Collection</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg  mx-auto">
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              value={newProject.name}
              onChange={(e) => handleNewProjectChange(e, 'name')}
              className="w-full  p-2 border rounded"
              placeholder="e.g., scorpia"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Title</label>
            <input
              type="text"
              value={newProject.title}
              onChange={(e) => handleNewProjectChange(e, 'title')}
              className="w-full p-2 border rounded"
              placeholder="e.g., Scorpia"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Title Images (Exactly 2 Required)</label>
            <div className=' grid grid-cols-2 gap-20'>
              {/* Fixed Title Image 1 */}
              <div className="flex relative flex-col w-full h-[36rem] gap-2 mb-2">
                <div className="flex h-full w-full items-center gap-2">
                  <label className="w-full   shadow-xl rounded-xl h-full p-2 border flex flex-col items-center justify-center cursor-pointer gap-2">
                    <Upload size={24} className="text-gray-500" />
                    <span className="text-sm text-gray-500">Upload Title Images</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "titleimg", 0)}
                      className="hidden"
                    />
                  </label>
                </div>
                {newProject.titleimg[0] && (
                  <div className=" absolute h-full left-0 top-0 w-full">
                    <img
                      src={newProject.titleimg[0]}
                      alt="Title Image 1"
                      className="h-full w-full object-cover rounded"
                    />
                    <button
                      onClick={() => removeUploadedImage('titleimg', 0)}
                      className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      X
                    </button>
                  </div>
                )}
              </div>
              {/* Fixed Title Image 2 */}
              <div className="flex flex-col relative h-[36rem] gap-2 mb-2">
                <div className="flex h-full w-full items-center gap-2">
                  <label className="w-full shadow-xl rounded-xl h-full p-2 border  flex flex-col items-center justify-center cursor-pointer gap-2">
                    <Upload size={24} className="text-gray-500" />
                    <span className="text-sm text-gray-500">Upload Title Images</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'titleimg', 1)}
                      className="hidden"
                    />
                  </label>

                </div>
                {newProject.titleimg[1] && (
                  <div className=" absolute top-0 left-0 w-full h-full">
                    <img
                      src={newProject.titleimg[1]}
                      alt="Title Image 2"
                      className="h-full w-full object-cover rounded"
                    />
                    <button
                      onClick={() => removeUploadedImage('titleimg', 1)}
                      className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      X
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Lines</label>
            {newProject.lines.map((line, index) => (
              <div key={index} className="flex shadow-lg rounded-2xl text-lg mt-2 text-[#333333] border-none  font-semibold gap-2 mb-2">
                <textarea
                  value={line}
                  onChange={(e) => handleNewProjectChange(e, 'lines', index)}
                  className="w-full p-2 border-none active:border-none rounded"
                  rows={3}
                  placeholder="Enter project description line"
                />
                {newProject.lines.length > 1 && (
                  <button
                    onClick={() => removeArrayItem('lines', index)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            
            <button
              onClick={() => addArrayItem('lines')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
            >
              Add Another Line
            </button>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Images</label>
            {newProject.images.map((img, index) => (
              <div key={index} className="flex flex-col gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-full w-full items-center gap-2">

                    <label className="w-full shadow-xl h-96 rounded-xl  p-2 border  flex flex-col items-center justify-center cursor-pointer gap-2">
                      <Upload size={24} className="text-gray-500" />
                      <span className="text-sm text-gray-500">Upload Images</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'images', index)}
                        className=" hidden "
                      />
                    </label>
                  </div>

                  {newProject.images.length > 1 && (
                    <button
                      onClick={() => removeArrayItem('images', index)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
                {img && (
                  <div className="relative">
                    <img
                      src={img}
                      alt={`Image ${index + 1}`}
                      className="w-full h-32 object-cover rounded"
                    />
                    <button
                      onClick={() => removeUploadedImage('images', index)}
                      className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      X
                    </button>
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={() => addArrayItem('images')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
            >
              Add Another Image
            </button>
          </div>
          {uploadStatus && <p className="text-sm text-gray-600">{uploadStatus}</p>}
          <button
            onClick={handleAddProject}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 w-full mt-4"
          >
            Save New Project
          </button>
        </div>
      </div>
    </div>
  );
}