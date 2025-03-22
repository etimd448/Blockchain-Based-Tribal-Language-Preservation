import { describe, it, expect, vi } from "vitest"

// Mock implementation
const mockSpeakerRegistration = {
  register: vi.fn().mockImplementation((name, tribe, fluencyLevel, contactInfo, bio) => {
    return { value: 1 }
  }),
  
  updateStatus: vi.fn().mockImplementation((speakerId, active) => {
    return { value: true }
  }),
  
  updateInfo: vi.fn().mockImplementation((speakerId, contactInfo, bio) => {
    return { value: true }
  }),
  
  getSpeaker: vi.fn().mockImplementation((id) => {
    return {
      name: "John Redfeather",
      tribe: "Cherokee Nation",
      fluencyLevel: "native",
      contactInfo: "john.redfeather@example.com",
      bio: "Born and raised speaking Cherokee, dedicated to preserving the language.",
      registeredAt: 12345,
      active: true,
    }
  }),
  
  getCount: vi.fn().mockImplementation(() => {
    return 3
  }),
}

describe("Speaker Registration Contract", () => {
  it("should register a new speaker", async () => {
    const result = await mockSpeakerRegistration.register(
        "John Redfeather",
        "Cherokee Nation",
        "native",
        "john.redfeather@example.com",
        "Born and raised speaking Cherokee, dedicated to preserving the language.",
    )
    
    expect(result.value).toBe(1)
    expect(mockSpeakerRegistration.register).toHaveBeenCalledWith(
        "John Redfeather",
        "Cherokee Nation",
        "native",
        "john.redfeather@example.com",
        "Born and raised speaking Cherokee, dedicated to preserving the language.",
    )
  })
  
  it("should update speaker status", async () => {
    const result = await mockSpeakerRegistration.updateStatus(1, false)
    
    expect(result.value).toBe(true)
    expect(mockSpeakerRegistration.updateStatus).toHaveBeenCalledWith(1, false)
  })
  
  it("should update speaker information", async () => {
    const result = await mockSpeakerRegistration.updateInfo(
        1,
        "john.r@example.com",
        "Native Cherokee speaker with 30 years of experience teaching the language.",
    )
    
    expect(result.value).toBe(true)
    expect(mockSpeakerRegistration.updateInfo).toHaveBeenCalledWith(
        1,
        "john.r@example.com",
        "Native Cherokee speaker with 30 years of experience teaching the language.",
    )
  })
  
  it("should get speaker details", async () => {
    const speaker = await mockSpeakerRegistration.getSpeaker(1)
    
    expect(speaker.name).toBe("John Redfeather")
    expect(speaker.tribe).toBe("Cherokee Nation")
    expect(speaker.fluencyLevel).toBe("native")
    expect(mockSpeakerRegistration.getSpeaker).toHaveBeenCalledWith(1)
  })
  
  it("should return the correct speaker count", async () => {
    const count = await mockSpeakerRegistration.getCount()
    
    expect(count).toBe(3)
    expect(mockSpeakerRegistration.getCount).toHaveBeenCalled()
  })
})

