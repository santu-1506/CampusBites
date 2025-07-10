"use client"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit3, 
  Camera, 
  Save, 
  X, 
  Shield, 
  Bell, 
  CreditCard, 
  Settings,
  ArrowLeft,
  Check,
  AlertCircle,
  Upload
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    address: user?.address || "",
    dateOfBirth: user?.dateOfBirth || "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [profileImage, setProfileImage] = useState("/placeholder-user.jpg")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      setIsEditing(false)
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center transition-colors duration-500">
        <Card className="w-full max-w-md mx-4 shadow-2xl border-0 bg-white/90 dark:bg-white/90 backdrop-blur-xl">
          <CardContent className="pt-12 pb-8 px-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <User className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-900">Please Sign In</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-700 mb-8 text-lg">
              You need to be logged in to view your profile.
            </CardDescription>
            <Button asChild className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg">
              <Link href="/login">Sign In to Continue</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 relative overflow-hidden transition-colors duration-500">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Light mode background */}
        <div className="absolute inset-0 opacity-100 dark:opacity-0 transition-opacity duration-500">
          <motion.div
            className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        {/* Dark mode background */}
        <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-500">
          <motion.div
            className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
      </div>

      {/* Header */}
      <div className="bg-white/80 dark:bg-white/10 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild variant="ghost" className="text-gray-900 dark:text-white hover:bg-gray-100/50 dark:hover:bg-white/10 rounded-xl">
                  <Link href="/orders">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                  </Link>
                </Button>
              </motion.div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">My Profile</h1>
                <p className="text-gray-600 dark:text-blue-200 mt-1">Manage your account information</p>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isEditing 
                    ? "bg-red-500 hover:bg-red-600 text-white" 
                    : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                }`}
              >
                {isEditing ? (
                  <>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Success/Error Messages */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              className="mb-6"
            >
              <Alert className={`border-0 ${
                message.type === 'success' 
                  ? 'bg-green-500/20 text-green-100 border-green-500/30' 
                  : 'bg-red-500/20 text-red-100 border-red-500/30'
              }`}>
                {message.type === 'success' ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <AlertCircle className="h-5 w-5" />
                )}
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-white/90 dark:bg-white/10 backdrop-blur-xl border-gray-200/50 dark:border-white/20 text-gray-900 dark:text-white shadow-lg">
              <CardHeader className="text-center pb-6">
                <div className="relative mx-auto mb-4">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 border-4 border-gray-300/50 dark:border-white/20 shadow-2xl">
                    <Image
                      src={profileImage}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-2 right-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-2 rounded-full shadow-lg transition-all duration-300"
                  >
                    <Camera className="w-4 h-4" />
                  </motion.button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">{profileData.name}</CardTitle>
                <CardDescription className="text-gray-600 dark:text-blue-200">{profileData.email}</CardDescription>
                <Badge className="mt-3 bg-green-500/20 text-green-600 dark:text-green-300 border-green-500/30 hover:bg-green-500/30">
                  Active Member
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600 dark:text-blue-200">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Member since January 2024</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-blue-200">
                  <CreditCard className="w-4 h-4" />
                  <span className="text-sm">12 orders completed</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-blue-200">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">Verified Account</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Profile Information */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white/90 dark:bg-white/10 backdrop-blur-xl border-gray-200/50 dark:border-white/20 text-gray-900 dark:text-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <User className="w-6 h-6" />
                  Personal Information
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-blue-200">
                  {isEditing ? "Edit your personal details below" : "Your account information"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-600 dark:text-blue-200 font-medium">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="bg-white/70 dark:bg-white/10 border-gray-300/50 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-blue-200/50 focus:border-orange-500"
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <div className="p-3 bg-gray-100/50 dark:bg-white/5 rounded-lg border border-gray-200/50 dark:border-white/10">
                        <span className="text-gray-900 dark:text-white">{profileData.name || "Not provided"}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-600 dark:text-blue-200 font-medium">Email Address</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-white/70 dark:bg-white/10 border-gray-300/50 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-blue-200/50 focus:border-orange-500"
                        placeholder="Enter your email"
                      />
                    ) : (
                      <div className="p-3 bg-gray-100/50 dark:bg-white/5 rounded-lg border border-gray-200/50 dark:border-white/10">
                        <span className="text-gray-900 dark:text-white">{profileData.email || "Not provided"}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-600 dark:text-blue-200 font-medium">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="bg-white/70 dark:bg-white/10 border-gray-300/50 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-blue-200/50 focus:border-orange-500"
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <div className="p-3 bg-gray-100/50 dark:bg-white/5 rounded-lg border border-gray-200/50 dark:border-white/10">
                        <span className="text-gray-900 dark:text-white">{profileData.phone || "Not provided"}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="text-gray-600 dark:text-blue-200 font-medium">Date of Birth</Label>
                    {isEditing ? (
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className="bg-white/70 dark:bg-white/10 border-gray-300/50 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-blue-200/50 focus:border-orange-500"
                      />
                    ) : (
                      <div className="p-3 bg-gray-100/50 dark:bg-white/5 rounded-lg border border-gray-200/50 dark:border-white/10">
                        <span className="text-gray-900 dark:text-white">{profileData.dateOfBirth || "Not provided"}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-gray-600 dark:text-blue-200 font-medium">Address</Label>
                  {isEditing ? (
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="bg-white/70 dark:bg-white/10 border-gray-300/50 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-blue-200/50 focus:border-orange-500"
                      placeholder="Enter your address"
                    />
                  ) : (
                    <div className="p-3 bg-gray-100/50 dark:bg-white/5 rounded-lg border border-gray-200/50 dark:border-white/10">
                      <span className="text-gray-900 dark:text-white">{profileData.address || "Not provided"}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-gray-600 dark:text-blue-200 font-medium">Bio</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      className="bg-white/70 dark:bg-white/10 border-gray-300/50 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-blue-200/50 focus:border-orange-500 min-h-[100px]"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <div className="p-3 bg-gray-100/50 dark:bg-white/5 rounded-lg border border-gray-200/50 dark:border-white/10 min-h-[100px]">
                      <span className="text-gray-900 dark:text-white">{profileData.bio || "No bio provided"}</span>
                    </div>
                  )}
                </div>

                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 pt-4"
                  >
                    <Button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold"
                    >
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 mr-2"
                        >
                          <Settings className="w-4 h-4" />
                        </motion.div>
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional Settings */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <Card className="bg-white/90 dark:bg-white/10 backdrop-blur-xl border-gray-200/50 dark:border-white/20 text-gray-900 dark:text-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Settings className="w-6 h-6" />
                Account Settings
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-blue-200">
                Manage your account preferences and security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-gray-100/50 dark:bg-white/5 rounded-xl border border-gray-200/50 dark:border-white/10 hover:bg-gray-200/50 dark:hover:bg-white/10 transition-all duration-300 cursor-pointer"
                >
                  <Bell className="w-8 h-8 text-orange-400 mb-3" />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Notifications</h3>
                  <p className="text-gray-600 dark:text-blue-200 text-sm">Manage your notification preferences</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-gray-100/50 dark:bg-white/5 rounded-xl border border-gray-200/50 dark:border-white/10 hover:bg-gray-200/50 dark:hover:bg-white/10 transition-all duration-300 cursor-pointer"
                >
                  <Shield className="w-8 h-8 text-green-400 mb-3" />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Security</h3>
                  <p className="text-gray-600 dark:text-blue-200 text-sm">Change password and security settings</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-gray-100/50 dark:bg-white/5 rounded-xl border border-gray-200/50 dark:border-white/10 hover:bg-gray-200/50 dark:hover:bg-white/10 transition-all duration-300 cursor-pointer"
                >
                  <CreditCard className="w-8 h-8 text-blue-400 mb-3" />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Payment</h3>
                  <p className="text-gray-600 dark:text-blue-200 text-sm">Manage payment methods and billing</p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
} 